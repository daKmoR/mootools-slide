/*
---
name: Behavior.Slide
description: Adds a slide interface
provides: [Behavior.Slide]
requires: [Behavior/Behavior, Slide, Delegator.SlideControls]
script: Behavior.Slide.js

...
*/

Behavior.addGlobalFilter('Slide', {

	defaults: {
		'containerposition': false,
		'autostart': true
	},

	setup: function(element, api) {
		var options = {
			autoStart: api.getAs(Boolean, 'autostart')
		};

		if (api.getAs(Boolean, 'containerposition')) {
			options.containerPosition = { position: 'center' };
		}

		return new Slide(element, options);
	}

});