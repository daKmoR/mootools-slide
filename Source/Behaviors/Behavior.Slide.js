/*
---
name: Behavior.Slide
description: Adds a slide interface
provides: [Behavior.Slide]
requires: [Behavior/Behavior, Slide, Delegator.SlideControls]
script: Behavior.Slide.js

Example Simple:
<div data-behavior="Slide" data-slide-duration="4000" class="...">
	<img data-behavior="Gallery.Element" src="..." alt="..." />
	<img data-behavior="Gallery.Element" src="..." alt="..." />
</div>
<div data-behavior="Gallery.Pagination" class="..."></div>

...
*/

Behavior.addGlobalFilter('Slide', {

	defaults: {
		'containerposition': false
	},

	setup: function(element, api) {
		var options = {};

		Object.merge(options, Object.cleanValues(
			api.getAs({
				auto: Boolean,
				duration: Number
			})
		));

		if (api.getAs(Boolean, 'containerposition')) {
			options.containerPosition = { position: 'center' };
		}

		return new Slide(element, options);
	}

});