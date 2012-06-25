/*
---

name: SlideLine
description: allows to create a Slide Line [CSS:Slide/Source/Css/SlideLineBase.css]
license: MIT-style license.
requires: [Slide]
provides: SlideLine

...
*/

var SlideLine = new Class({

	Extends: Gallery,

	options: {
		mode: 'repeat', /* [repeat, reverse, random, once] */
		auto: true,
		positionContainer: false,
		container: null,
		steps: 1,
		elementSize: { width: 121, height: 105 }
	},

	_elements: [],
	currentStep: 0,

	initialize: function(wrap, options) {
		this.parent(wrap, options);
		this.container = this.wrap.getParent();
	},

	guessSize: function() {
		var firstElement = this.wrap.getElement('> *');
		var dim = firstElement.getDimensions({
			computeSize: true,
			styles: ['padding', 'border', 'margin'],
			mode: 'horizontal'
		});
		this.options.elementSize.width = dim.totalWidth;
	},

	next: function(times) {
		this.guessSize();
		this.currentStep += this.options.steps;
		this.visibleSteps = Math.round(this.container.getWidth() / this.options.elementSize.width);

		if (this.currentStep + this.visibleSteps >= this._elements.length) {
			this.currentStep -= this.options.steps*2;
			this.wrap.setStyle('margin-left', this.currentStep * -this.options.elementSize.width);
			var elements = this.wrap.getElements('> *');
			for (var i = 0; i < this.options.steps; i++) {
				elements[i].inject(this.wrap, 'bottom');
			}
			this.currentStep += this.options.steps;
		}
		this.wrap.tween('margin-left', this.currentStep * -this.options.elementSize.width);
		this.show();
	},

	previous: function() {
		this.guessSize();
		this.currentStep -= this.options.steps;
		this.visibleSteps = Math.round(this.container.getWidth() / this.options.elementSize.width);

		if (this.currentStep < 0) {
			this.currentStep += this.options.steps*2;
			this.wrap.setStyle('margin-left', this.currentStep * -this.options.elementSize.width);
			var elements = this.wrap.getElements('> *');
			for (var i = 0; i < this.options.steps; i++) {
				elements[elements.length - 1 - i].inject(this.wrap, 'top');
			}
			this.currentStep -= this.options.steps;
		}
		this.wrap.tween('margin-left', this.currentStep * -this.options.elementSize.width);
		this.show();
	}

});