/*
---
name: Behavior.Gallery.Element
description: ...
provides: [Behavior.Gallery.Element]
requires: [Behavior/Behavior, More/Object.Extras, Gallery.Image, Gallery.Div, Gallery.Link.Request, Behavior.Slide]
script: Behavior.Gallery.Element.js

Example:
<div data-behavior="Slide" data-slide-duration="4000" class="...">
	<img data-behavior="Gallery.Element" src="..." alt="..." />
	<img data-behavior="Gallery.Element" src="..." alt="..." />
</div>

...
*/

Behavior.addGlobalFilter('Gallery.Element', {

	defaults: {
		target: '![data-behavior="Slide"], ![data-behavior="Line"]',
		type: 'auto',
		isstartelement: null,
		width: null,
		height: null,
		adjust: null,
		requestfilter: null,
		hidefx: null
	},

	setup: function(element, api) {
		var target = element.getElement(api.getAs(String, 'target'));
		var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('Line');
		var options = Object.cleanValues({
			isStartElement: api.getAs(Boolean, 'isstartelement'),
			size: Object.cleanValues(
				api.getAs({
					width: Number,
					height: Number
				})
			),
			hideFx: api.getAs(String, 'hidefx')
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