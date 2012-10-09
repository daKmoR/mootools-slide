/*
---
name: Behavior.Line
description: Adds a slideLine interface
provides: [Behavior.Line]
requires: [Behavior/Behavior, Line, Marquee]
script: Behavior.Line.js

...
*/

Behavior.addGlobalFilter('Line', {

	defaults: {
		'containerposition': false,
		'duration': 4000,
		'element-width': 140,
		'mode': 'Line'
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

		return new Marquee(element, options);
		//return new Line(element, options);
	}

});