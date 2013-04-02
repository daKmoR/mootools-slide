/*
---
name: Behavior.Gallery.Pagination
description: ...
provides: [Behavior.Gallery.Pagination]
requires: [Behavior/Behavior, Behavior.Slide, Gallery.Pagination, Delegator.Gallery.Show]
script: Behavior.Gallery.Pagination.js

Example Simple:
<div data-behavior="Slide" data-slide-duration="4000" class="...">
	<img data-behavior="Gallery.Element" src="..." alt="..." />
	<img data-behavior="Gallery.Element" src="..." alt="..." />
</div>
<div data-behavior="Gallery.Pagination" class="..."></div>

Example Centered with Style Behavior:
<div data-behavior="Gallery.Pagination Style" data-style-property="margin-left" data-style-from-property="width" data-style-invert="true" data-style-divide="2"></div>

...
*/

Behavior.addGlobalFilter('Gallery.Pagination', {

	defaults: {
		target: '!div > [data-behavior="Slide"], !div > * > [data-behavior="Slide"], !body [data-behavior="Slide"], !div > [data-behavior="Line"], !div > * > [data-behavior="Line"], !body [data-behavior="Line"]'
	},

	setup: function(element, api) {
		var target = element.getElement(api.getAs(String, 'target'));
		var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('Line');
		var options = {};

		slide.createPagination(element, options);
		return slide;
	}

});