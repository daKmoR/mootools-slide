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
		'containerposition': false,
		'duration': 4000
	},

	setup: function(element, api) {
		var options = {};

		if (api.getAs(Boolean, 'containerposition')) {
			options = {
				containerPosition: { position: 'center' }
			};
		}
		options.duration = api.getAs(Number, 'duration');

		return new SlideLine(element, options);
	}

});