/* eslint-env amd */
define([],
function() {
	/**
	 * @fileoverview A class of the code path segment.
	 * @author Toru Nagashima
	 */

	"use strict";
	//------------------------------------------------------------------------------
	// Helpers
	//------------------------------------------------------------------------------

	/**
	 * Replaces unused segments with the previous segments of each unused segment.
	 *
	 * @param {CodePathSegment[]} segments - An array of segments to replace.
	 * @returns {CodePathSegment[]} The replaced array.
	 */
	function flattenUnusedSegments(segments) {
		var done = Object.create(null);
		var retv = [];

		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];

			// Ignores duplicated.
			if (done[segment.id]) {
				continue;
			}

			// Use previous segments if unused.
			if (!segment.internal.used) {
				for (var j = 0; j < segment.allPrevSegments.length; ++j) {
					var prevSegment = segment.allPrevSegments[j];

					if (!done[prevSegment.id]) {
						done[prevSegment.id] = true;
						retv.push(prevSegment);
					}
				}
			} else {
				done[segment.id] = true;
				retv.push(segment);
			}
		}

		return retv;
	}

	/**
	 * Checks whether or not a given segment is reachable.
	 *
	 * @param {CodePathSegment} segment - A segment to check.
	 * @returns {boolean} `true` if the segment is reachable.
	 */
	function isReachable(segment) {
		return segment.reachable;
	}

	//------------------------------------------------------------------------------
	// Public Interface
	//------------------------------------------------------------------------------

	/**
	 * A code path segment.
	 *
	 * @constructor
	 * @param {string} id - An identifier.
	 * @param {CodePathSegment[]} allPrevSegments - An array of the previous segments.
	 *   This array includes unreachable segments.
	 * @param {boolean} reachable - A flag which shows this is reachable.
	 */
	function CodePathSegment(id, allPrevSegments, reachable) {

		/**
		 * The identifier of this code path.
		 * Rules use it to store additional information of each rule.
		 * @type {string}
		 */
		this.id = id;

		/**
		 * An array of the next segments.
		 * @type {CodePathSegment[]}
		 */
		this.nextSegments = [];

		/**
		 * An array of the previous segments.
		 * @type {CodePathSegment[]}
		 */
		this.prevSegments = allPrevSegments.filter(isReachable);

		/**
		 * An array of the next segments.
		 * This array includes unreachable segments.
		 * @type {CodePathSegment[]}
		 */
		this.allNextSegments = [];

		/**
		 * An array of the previous segments.
		 * This array includes unreachable segments.
		 * @type {CodePathSegment[]}
		 */
		this.allPrevSegments = allPrevSegments;

		/**
		 * A flag which shows this is reachable.
		 * @type {boolean}
		 */
		this.reachable = reachable;

		// Internal data.
		Object.defineProperty(this, "internal", {
			value: {
				used: false,
				loopedPrevSegments: []
			}
		});
	}

	CodePathSegment.prototype = {
		constructor: CodePathSegment,

		/**
		 * Checks a given previous segment is coming from the end of a loop.
		 *
		 * @param {CodePathSegment} segment - A previous segment to check.
		 * @returns {boolean} `true` if the segment is coming from the end of a loop.
		 */
		isLoopedPrevSegment: function(segment) {
			return this.internal.loopedPrevSegments.indexOf(segment) !== -1;
		}
	};

	/**
	 * Creates the root segment.
	 *
	 * @param {string} id - An identifier.
	 * @returns {CodePathSegment} The created segment.
	 */
	CodePathSegment.newRoot = function(id) {
		return new CodePathSegment(id, [], true);
	};

	/**
	 * Creates a segment that follows given segments.
	 *
	 * @param {string} id - An identifier.
	 * @param {CodePathSegment[]} allPrevSegments - An array of the previous segments.
	 * @returns {CodePathSegment} The created segment.
	 */
	CodePathSegment.newNext = function(id, allPrevSegments) {
		return new CodePathSegment(
			id,
			flattenUnusedSegments(allPrevSegments),
			allPrevSegments.some(isReachable));
	};

	/**
	 * Creates an unreachable segment that follows given segments.
	 *
	 * @param {string} id - An identifier.
	 * @param {CodePathSegment[]} allPrevSegments - An array of the previous segments.
	 * @returns {CodePathSegment} The created segment.
	 */
	CodePathSegment.newUnreachable = function(id, allPrevSegments) {
		var segment = new CodePathSegment(id, flattenUnusedSegments(allPrevSegments), false);

		// In `if (a) return a; foo();` case, the unreachable segment preceded by
		// the return statement is not used but must not be remove.
		CodePathSegment.markUsed(segment);

		return segment;
	};

	/**
	 * Creates a segment that follows given segments.
	 * This factory method does not connect with `allPrevSegments`.
	 * But this inherits `reachable` flag.
	 *
	 * @param {string} id - An identifier.
	 * @param {CodePathSegment[]} allPrevSegments - An array of the previous segments.
	 * @returns {CodePathSegment} The created segment.
	 */
	CodePathSegment.newDisconnected = function(id, allPrevSegments) {
		return new CodePathSegment(id, [], allPrevSegments.some(isReachable));
	};

	/**
	 * Makes a given segment being used.
	 *
	 * And this function registers the segment into the previous segments as a next.
	 *
	 * @param {CodePathSegment} segment - A segment to mark.
	 * @returns {void}
	 */
	CodePathSegment.markUsed = function(segment) {
		if (segment.internal.used) {
			return;
		}
		segment.internal.used = true;

		var i;

		if (segment.reachable) {
			for (i = 0; i < segment.allPrevSegments.length; ++i) {
				var prevSegment = segment.allPrevSegments[i];

				prevSegment.allNextSegments.push(segment);
				prevSegment.nextSegments.push(segment);
			}
		} else {
			for (i = 0; i < segment.allPrevSegments.length; ++i) {
				segment.allPrevSegments[i].allNextSegments.push(segment);
			}
		}
	};

	/**
	 * Marks a previous segment as looped.
	 *
	 * @param {CodePathSegment} segment - A segment.
	 * @param {CodePathSegment} prevSegment - A previous segment to mark.
	 * @returns {void}
	 */
	CodePathSegment.markPrevSegmentAsLooped = function(segment, prevSegment) {
		segment.internal.loopedPrevSegments.push(prevSegment);
	};

	return CodePathSegment;
});