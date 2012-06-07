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
		'duration': 4000,
		'element-width': 140
	},

	setup: function(element, api) {
		var options = {};

		if (api.getAs(Boolean, 'containerposition')) {
			options = {
				containerPosition: { position: 'center' }
			};
		}
		options.duration = api.getAs(Number, 'duration');
		options.elementSize = { width: api.getAs(Number, 'element-width') };

		return new SlideLine(element, options);
	}

});