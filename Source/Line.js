/*
---

name: Line
description: allows to create a Slide Line [CSS:Slide/Source/Css/Line.css]
license: MIT-style license.
requires: [Gallery]
provides: Line

...
*/

/* SHOULD BE REFACTORED to use Fx.Scroll */

var Line = new Class({

	Extends: Gallery,

	options: {
		mode: 'repeat', /* [repeat, reverse, random, once] */
		auto: true,
		positionContainer: false,
		container: null,
		steps: 1,
		elementSize: { width: 121, height: 105 }
	},

	elements: [],
	currentStep: 0,

	initialize: function(element, options) {
		this.parent(element, options);
		this.container = this.element.getParent();
	},

	guessSize: function() {
		var firstElement = this.element.getElement('> *');
		var dim = firstElement.getDimensions({
			computeSize: true,
			styles: ['padding', 'border', 'margin'],
			mode: 'horizontal'
		});
		this.options.elementSize.width = dim.totalWidth;
	},

	next: function(times, _mode) {
		var newMarginLeft = this.element.getStyle('margin-left').toInt();
		var elements = this.element.getElements('> *');
		var mode = _mode || 'left';
		for (var i = 0; i < this.options.steps; i++) {
			this.guessSize();
			newMarginLeft -= this.options.elementSize.width;
		}
		this.element.tween('margin-left', newMarginLeft).get('tween').chain(function() {
			for (var i = 0; i < this.options.steps; i++) {
				elements[i].inject(this.element, mode === 'left' ? 'bottom' : 'top');
				newMarginLeft = mode === 'left' ? newMarginLeft - this.options.elementSize.width : newMarginLeft + this.options.elementSize.width;
			}
			this.element.setStyle('margin-left', 0);
		}.bind(this));
		this.show();
	},

	previous: function(times) {
		this.next(times, 'right');
	}

});