/*
---
description: ...
provides: [Delegator.Gallery.Show]
requires: [Behavior/Delegator, Core/Element, Slide]
script: Delegator.Gallery.Show.js
name: Delegator.Gallery.Show
...
*/

(function(){

	Delegator.register('click', 'Gallery.Show', {

		require: ['element'],

		defaults: {
			target: '!div > [data-behavior="Slide"], !div > * > [data-behavior="Slide"], !body [data-behavior="Slide"], !div > [data-behavior="Line"], !div > * > [data-behavior="Line"], !body [data-behavior="Line"]'
		},

		handler: function(event, link, api) {
			event.stop();
			var target = link.getElement(api.getAs(String, 'target'));
			if (!target) {
				api.fail('could not locate target slide where to show the element', link);
			}
			var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('Line');

			var element = link.getElement(api.getAs(String, 'element'));
			if (!element) {
				api.fail('could not locate element to show in target slide', link);
			}
			var slideElement = element.getBehaviorResult('Gallery.Element');

			slide.show(slideElement);
		}

	});

})();