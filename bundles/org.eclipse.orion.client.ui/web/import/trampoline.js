/*******************************************************************************
 * @license
 * Copyright (c) 2013 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/
/*global define module document console URL window*/

/* 0. external page require()'s [someOrionServer]/import/trampoline.js
 * 1. trampoline.js injects an iframe for communicating with Orion:
 *    -- iframe src is [orion_site]/import.html 
 *    -- iframe contains a page (outside of Orion auth filter??) that bootstraps itself in the normal page way
 * 2. How do we install the plugin provided by the external site?
 * --trampoline registers itself as an 'orion.core.autoimport' service provider
 * --Wait for import frame to tell us it's loaded
 * --When it's loaded, post a message giving our location (that is, the URL of external page, who included this script)
 * --Frame installs external page as a plugin
 *
 * TODO build an optimized version of this file that can be dropped into <script> tag, like plugin.js
 * - figure out how our dependencies can be handled
 */
define(['../orion/URL-shim.js', '../orion/plugin.js', '../orion/EventTarget.js', 'domReady!'], function(_, PluginProvider, EventTarget) {
	var trampoline = {};
	EventTarget.attach(trampoline);

	function Importer(targetWindow, origin) {
		EventTarget.attach(this);
		this['import'] = function(data) {
			targetWindow.postMessage(data, origin);
		};
		var _self = this;
		window.addEventListener('message', function(event) {
			if (event.origin !== origin) {
				return;
			}
			if (event.data && event.data.type === 'response') {
				console.log('trampoline: received message ' + JSON.stringify(event.data));
				_self.dispatchEvent(event.data);
			}
		});
	}

	function injectImportIFrame(importerURL) {
		console.log('trampoline: injecting iframe, src: ' + importerURL.href);
		var iframe = document.createElement('iframe');
		iframe.src = importerURL.href;
		iframe.style.opacity = '0.5';
		document.getElementsByTagName('body')[0].appendChild(iframe);
		return iframe;
	}

	// domReady
	console.log('trampoline: looking for our script URL...');
	var script = document.currentScript;
	if (!script) {
		Array.prototype.some.call(document.querySelectorAll('script[src]'), function(s) {
			if (/trampoline\.js$/.test(s.src)) {
				script = s;
				return true;
			}
		});
	}
	if (!script) {
		throw new Error("Could not find <script> tag for trampoline.js");
	}
	console.log('trampoline: got it: ' + script.src);

	var importerURL = new URL('./import.html', script.src);
	var iframe = injectImportIFrame(importerURL);

	// Wait for import.html to tell us it's loaded
	window.addEventListener('message', function(event) {
		if (event.origin !== importerURL.origin) {
			return;
		}
		console.log('trampoline: got a message ' + JSON.stringify(event.data));
		if (event.data === 'serviceRegistered') {
			// importer has registered service for us; we are done
			console.log('trampoline: done');
			var importer = new Importer(event.source, importerURL.origin);
			trampoline.dispatchEvent({type: 'ready', importer: importer});
		}
	});

	return trampoline;
});