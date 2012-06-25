/*
---
description: Gallery Controls
provides: [Delegator.SlideControls]
requires: [Behavior/Delegator, Core/Element, Slide]
script: Delegator.Gallery.Controls.js
name: Delegator.Gallery.Controls
...
*/

(function(){

	var triggers = {};

	['start', 'stop', 'next', 'previous'].each(function(action) {

		triggers['Gallery.' + action] = {
			defaults: {
				targets: '!div > [data-behavior="Slide"], !div > * > [data-behavior="Slide"], !body [data-behavior="Slide"], !div > [data-behavior="Line"], !div > * > [data-behavior="Line"], !body [data-behavior="Line"]'
			},
			handler: function(event, link, api) {
				event.stop();
				var targets = link.getElements(api.getAs(String, 'targets'));
				if (!targets) {
					api.fail('could not locate target slide to ' + action + ' it', link);
				}
				targets.each(function(target) {
					var slide = target.getBehaviorResult('Slide') || target.getBehaviorResult('Line');
					slide[action]();
				});
			}
		};

	});

	Delegator.register('click', triggers);

})();