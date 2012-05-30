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
				targets: '!body [data-behavior="Slide"]'
			},
			handler: function(event, link, api) {
				event.stop();
				var targets = link.getElements(api.getAs(String, 'targets'));
				if (!targets) {
					api.fail('could not locate target slide to ' + action + ' it', link);
				}
				targets.each(function(target) {
					var slide = target.getBehaviorResult('Slide');
					slide[action]();
				});
			}
		};

	});

	Delegator.register('click', triggers);

})();