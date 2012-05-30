/*
---
name: Behavior.SlideLine
description: Adds a slideLine interface
provides: [Behavior.SlideLine]
requires: [Behavior/Behavior, SlideLine]
script: Behavior.SlideLine.js

...
*/

Behavior.addGlobalFilter('SlideLine', {

	defaults: {
		'containerposition': false
	},

	setup: function(element, api) {
		var options = {};

		if (api.getAs(Boolean, 'containerposition')) {
			options = {
				containerPosition: { position: 'center' }
			};
		}

		return new SlideLine(element, options);
	}

});