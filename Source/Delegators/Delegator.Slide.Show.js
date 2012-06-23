/*
---
description: ...
provides: [Delegator.Slide.Show]
requires: [Behavior/Delegator, Core/Element, Slide]
script: Delegator.Slide.Show.js
name: Delegator.Slide.Show
...
*/

(function(){

	Delegator.register('click', 'Slide.Show', {

		require: ['element'],

		defaults: {
			target: '!div > [data-behavior="Slide"], !div > * > [data-behavior="Slide"], !body [data-behavior="Slide"], !div > [data-behavior="SlideLine"], !div > * > [data-behavior="SlideLine"], !body [data-behavior="SlideLine"]'
		},

		handler: function(event, link, api) {
			event.stop();
			var target = link.getElement(api.getAs(String, 'target'));
			if (!target) {
				api.fail('could not locate target slide where to show the element', link);
			}
			var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('SlideLine');

			var element = link.getElement(api.getAs(String, 'element'));
			if (!element) {
				api.fail('could not locate element to show in target slide', link);
			}
			var slideElement = element.getBehaviorResult('Slide.Element');

			slide.show(slideElement);
		}

	});

})();