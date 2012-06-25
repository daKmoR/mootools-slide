/*
---
name: Behavior.Line
description: Adds a slideLine interface
provides: [Behavior.Line]
requires: [Behavior/Behavior, Line]
script: Behavior.Line.js

...
*/

Behavior.addGlobalFilter('Line', {

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

		return new Line(element, options);
	}

});