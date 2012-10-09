/*
---

name: Marquee
description: allows to create a Slide Marquee
license: MIT-style license.
requires: [Gallery]
provides: Marquee

...
*/

var Marquee = new Class({

	Extends: Gallery,

	options: {
		durationFactor: 25
	},

	elements: [],

	initialize: function(element, options) {
		this.parent(element, options);
		this.container = this.element.getParent();
	},

	doFx: function() {
		var minSize = this.container.getSize().x;
		var scrollSize = 0, scrolledElements = 0;
		var elements = this.element.getElements('> *');

		elements.each(function(element) {
			if (scrollSize < minSize) {
				var dim = element.getDimensions({
					computeSize: true,
					styles: ['padding', 'border', 'margin'],
					mode: 'horizontal'
				});
				scrollSize += dim.totalWidth;
				scrolledElements += 1;
			}
		});

		this.scrollSize = scrollSize;

		this.fx.setOptions({
			duration: this.scrollSize * this.options.durationFactor
		});

		this.fx.start(this.scrollSize, 0).chain(function() {
			elements.each(function(element, i) {
				this.fx.set(0, 0);
				if (i < scrolledElements) {
					element.inject(this.element, 'bottom');
				}
			}, this);
			this.doFx();
		}.bind(this));
	},

	start: function() {
		this.fx = new Fx.Scroll(this.container, {
			transition: Fx.Transitions.linear
		});
		this.doFx();
	}

});