/*
---
name: Behavior.Slide.Pagination
description: ...
provides: [Behavior.Slide.Pagination]
requires: [Behavior/Behavior, Behavior.Slide, Slide.Pagination, Delegator.Slide.Show]
script: Behavior.Slide.Pagination.js

...
*/

Behavior.addGlobalFilter('Slide.Pagination', {

	defaults: {
		target: '!div > [data-behavior="Slide"], !div > * > [data-behavior="Slide"], !body [data-behavior="Slide"], !div > [data-behavior="SlideLine"], !div > * > [data-behavior="SlideLine"], !body [data-behavior="SlideLine"]'
	},

	setup: function(element, api) {
		var target = element.getElement(api.getAs(String, 'target'));
		var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('SlideLine');
		var options = {};

		slide.createPagination(element, options);
		return slide;
	}

});