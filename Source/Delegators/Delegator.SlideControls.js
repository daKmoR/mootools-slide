/*
---
description: Slide Controls
provides: [Delegator.SlideControls]
requires: [Behavior/Delegator, Core/Element, Slide]
script: Delegator.SlideControls.js
name: Delegator.SlideControls
...
*/

(function(){

	var triggers = {};

	['start', 'stop', 'next', 'previous'].each(function(action) {

		triggers['Slide.' + action] = {
			defaults: {
				target: '!body [data-behavior="Slide"]'
			},
			handler: function(event, link, api) {
				event.stop();
				var target = link.getElement(api.getAs(String, 'target'));
				if (!target) api.fail('could not locate target slide to ' + action + ' it', link);
				var slide = target.getBehaviorResult('Slide');
				slide[action]();
			}
		};

	});

	Delegator.register('click', triggers);

})();