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

	Extends: Slide,

	options: {
		mode: 'repeat', /* [repeat, reverse, random, once] */
		autoStart: true,
		positionContainer: false,
		container: null,
		steps: 1
	},

	_elements: [],
	elementSize: { width: 121, height: 105 },

	currentStep: 0,

	initialize: function(wrap, options) {
		this.parent(wrap, options);
	},

	next: function(times) {
		this.currentStep += this.options.steps;
		this.visibleSteps = Math.round(this.container.getWidth() / this.elementSize.width);

		if (this.currentStep + this.visibleSteps >= this._elements.length) {
			this.currentStep -= this.options.steps*2;
			this.wrap.setStyle('margin-left', this.currentStep * -this.elementSize.width);
			var elements = this.wrap.getElements('> *');
			for (var i = 0; i < this.options.steps; i++) {
				elements[i].inject(this.wrap, 'bottom');
			}
			this.currentStep += this.options.steps;
		}
		this.wrap.tween('margin-left', this.currentStep * -this.elementSize.width);
		this.show();
	},

	previous: function() {
		this.currentStep -= this.options.steps;
		this.visibleSteps = Math.round(this.container.getWidth() / this.elementSize.width);

		if (this.currentStep < 0) {
			this.currentStep += this.options.steps*2;
			this.wrap.setStyle('margin-left', this.currentStep * -this.elementSize.width);
			var elements = this.wrap.getElements('> *');
			for (var i = 0; i < this.options.steps; i++) {
				elements[elements.length - 1 - i].inject(this.wrap, 'top');
			}
			this.currentStep -= this.options.steps;
		}
		this.wrap.tween('margin-left', this.currentStep * -this.elementSize.width);
		this.show();
	}

});