/*
---
name: Behavior.Gallery.Pagination
description: ...
provides: [Behavior.Gallery.Pagination]
requires: [Behavior/Behavior, Behavior.Slide, Gallery.Pagination, Delegator.Gallery.Show]
script: Behavior.Gallery.Pagination.js

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