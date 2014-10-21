/*******************************************************************************
 * @license
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 ******************************************************************************/

//NLS_CHARSET=UTF-8
/*eslint-env browser, amd*/
define({
	"Navigator": "Navigator",
	"Sites": "Sites",
	"Shell": "Shell",
	"ShellLinkWorkspace": "Workspace Shell",
	"Get Plugins": "Get Plugins",
	"Global": "Global",
	"Editor": "Editor",
	"EditorRelatedLink": "Show Current Folder",
	"EditorRelatedLinkParent": "Show Enclosing Folder",
	"EditorLinkWorkspace": "Show Workspace",
	"EditorRelatedLinkProj": "Show Project",
	"Filter bindings": "Filter bindings",
	"Orion Editor": "Orion Editor",
	"Orion Image Viewer": "Orion Image Viewer",
	"Orion Markdown Editor": "Orion Markdown Editor",
	"Orion Markdown Viewer": "Orion Markdown Viewer",
	"Orion JSON Editor": "Orion JSON Editor",
	"View on Site": "View on Site",
	"View this file or folder on a web site hosted by Orion": "View this file or folder on a web site hosted by Orion.",
	"ShowAllKeyBindings": "Show a list of all the keybindings on this page",
	"Show Keys": "Show Keys",
	"HideShowBannerFooter": "Hide or show the page banner and footer",
	"Toggle banner and footer": "Toggle banner and footer",
	"ChooseFileOpenEditor": "Choose a file by name and open an editor on it",
	"FindFile": "Find File Named...",
	"System Configuration Details": "System Configuration Details",
	"System Config Tooltip": "Go to the System Configuration Details page",
	"Background Operations": "Background Operations",
	"Background Operations Tooltip": "Go to the Background Operations page",
	"Operation status is unknown": "Operation status is unknown",
	"Unknown item": "Unknown item",
	"NoSearchAvailableErr": "Can't search: no search service is available",
	"Related": "Related",
	"Options": "Options",
	"FAQ": "FAQ",
	"Report a Bug": "Bugs",
	"Privacy Policy": "Privacy",
	"Terms of Use": "Terms",
	"Copyright Agent": "Copyright",
	"Orion Logo": "Orion Logo",
	"Orion is in Beta. Please try it out but BEWARE your data may be lost.": "@buildLabel@",
	"LOG: ": "LOG: ",
	"View": "View",
	"no parent": "no parent",
	"no tree model": "no tree model",
	"no renderer": "no renderer",
	"could not find table row ": "could not find table row ",
	"Operations": "Operations",
	"Operations running": "Operations running",
	"SomeOpWarning": "Some operations finished with warning",
	"SomeOpErr": "Some operations finished with error",
	"no service registry": "no service registry",
	"Tasks": "Tasks",
	"Close": "Close",
	"Expand all": "Expand all",
	"Collapse all": "Collapse all",
	"Search" : "Search",
	"Advanced search" : "Advanced search",
	"Submit" : "Submit",
	"More" : "More",
	"Recent searches" : "Recent searches",
	"Regular expression" : "Regular expression",
	"Search options" : "Search options",
	"Global search" : "Global search",
	"Orion Home" : "Orion Home",
	"Close notification" : "Close notification",
	"OpPressSpaceMsg" : "Operations - Press spacebar to show current operations",
	"Toggle side panel" : "Toggle side panel",
	"Open or close the side panel": "Open or close the side panel",
	"Projects" : "Projects",
	"Toggle Sidebar" : "Toggle Sidebar",
	"Sample HTML5 Site": "Sample HTML5 Site",
	"Generate an HTML5 'Hello World' website, including JavaScript, HTML, and CSS files.": "Generate an HTML5 'Hello World' website, including JavaScript, HTML, and CSS files.",
	"Sample Orion Plugin": "Sample Orion Plugin",
	"Generate a sample plugin for integrating with Orion.": "Generate a sample plugin for integrating with Orion.",
	"Browser": "Web Browser",
	"OutlineProgress": "Getting outline for ${0} from ${1}",
	"UnknownError": "An unknown error occurred.",
	"UnknownWarning": "An unknown warning occurred.",
	"Filter": "Filter (* = any string, ? = any character)",
	"TemplateExplorerLabel": "Templates",
	"OpenTemplateExplorer": "Open Template Explorer",
	"Edit": "Edit",
	"CentralNavTooltip": "Toggle Navigation Menu",
	"Wrote: ${0}": "Wrote: ${0}",
	"GenerateHTML": "Generate HTML file",
	"GenerateHTMLTooltip": "Write an HTML file generated from the current Markdown editor content",
	"alt text": "alt text",
	"blockquote": "blockquote",
	"code": "code",
	"code (block)": "code (block)",
	"code (span)": "code (span)",
	"emphasis": "emphasis",
	"fenced code (${0})": "fenced code (${0})",
	"header (${0})": "header (${0})",
	"horizontal rule": "horizontal rule",
	"label": "label",
	"link (auto)": "link (auto)",
	"link (image)": "link (image)",
	"link (inline)": "link (inline)",
	"link label": "link label",
	"link label (optional)": "link label (optional)",
	"link (ref)": "link (ref)",
	"list item (bullet)": "list item (bullet)",
	"list item (numbered)": "list item (numbered)",
	"strikethrough (${0})": "strikethrough (${0})",
	"strong": "strong",
	"table (${0})": "table (${0})",
	"text": "text",
	"title (optional)": "title (optional)",
	"url": "url",
	"TogglePaneOrientationTooltip": "Toggle split pane orientation",
	"WarningHeaderTooDeep": "Header level cannot exceed 6",
	"WarningUnorderedListItem": "Unordered list item within ordered list",
	"WarningOrderedListItem": "Ordered list item within unordered list",
	"WarningOrderedListShouldStartAt1": "The first item in an ordered list should have index 1",
	"WarningLinkHasNoText": "Link has no text",
	"WarningLinkHasNoURL": "Link has no URL",
	"WarningUndefinedLinkId": "Undefined link ID: ${0}",
	"PageTitleFormat": "${0} - ${1}", // ${0} is the file or resource being edited; ${1} is the task (eg. "Editor")
	// Display names for keys:
	"KeyCTRL": "Ctrl",
	"KeySHIFT": "Shift",
	"KeyALT": "Alt",
	"KeyBKSPC": "Backspace",
	"KeyDEL": "Del",
	"KeyEND": "End",
	"KeyENTER": "Enter",
	"KeyESCAPE": "Esc",
	"KeyHOME": "Home",
	"KeyINSERT": "Ins",
	"KeyPAGEDOWN": "Page Down",
	"KeyPAGEUP": "Page Up",
	"KeySPACE": "Space",
	"KeyTAB": "Tab",
	// End key names
});