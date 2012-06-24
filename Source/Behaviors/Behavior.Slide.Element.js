/*
---
name: Behavior.Slide.Element
description: ...
provides: [Behavior.Slide.Element]
requires: [Behavior/Behavior, More/Object.Extras, Slide.Image, Slide.Div, Slide.Link.Request, Behavior.Slide]
script: Behavior.Slide.Element.js

...
*/

Behavior.addGlobalFilter('Slide.Element', {

	defaults: {
		target: '![data-behavior="Slide"], ![data-behavior="SlideLine"]',
		type: 'auto',
		isstartelement: null,
		width: null,
		height: null,
		adjust: null,
		requestfilter: null
	},

	setup: function(element, api) {
		var target = element.getElement(api.getAs(String, 'target'));
		var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('SlideLine');
		var options = Object.cleanValues({
			isStartElement: api.getAs(Boolean, 'isstartelement'),
			size: Object.cleanValues(
				api.getAs({
					width: Number,
					height: Number
				})
			)
		});

		Object.merge(options, Object.cleanValues(
			api.getAs({
				requestfilter: String,
				adjust: String
			})
		));

		var slideElement = slide.addElement(element, options);
		slideElement.addEvent('onLinkRequestLoaded', function(div) {
			api.applyFilters(div);
		});
		return slideElement;
	}

});