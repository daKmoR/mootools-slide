/*
---

name: Slide
description: allows to create almost any Sliding Stuff (Galleries, Tabs...) with multiple effects [CSS:Slide/Source/Css/Slide.css]
license: MIT-style license.
requires: [Core/Element.Dimensions, Core/Element.Style, Core/Fx.Tween, Core/Fx.Morph, Core/Fx.Transitions, More/Fx.Elements, More/Scroller, More/Fx.Scroll, More/Element.Position, More/Assets, More/URI, /Gallery]
provides: Slide

...
*/

var Slide = new Class({

	Extends: Gallery,

	options: {
		mode: 'repeat', /* [repeat, reverse, random, once] */
		auto: true,
		positionContainer: false,
		container: null,
		containerPosition: null //{ position: 'center' }
	},

	currentElement: null,
	_elements: [],

	initialize: function(element, options) {
		this.parent(element, options);
		this.container = this.element.getParent();
		(function() {
			this.display(this._elements[0]);
		}).delay(2, this);

		window.addEvent('resize', function() {
			this.currentElement.display();
		}.bind(this));
	},

	setSize: function(size) {
		this.element.setStyles(size);
	},

	getSize: function() {
		return { width: this.element.getStyle('width').toInt(), height: this.element.getStyle('height').toInt() };
	},

	start: function() {
		if (this.getSize().height.toInt() === 0) {
			this.setSize(this._elements[0].options.size);
		}
		if (this._elements.length > 1) {
			this.parent();
		}
	},

	display: function(element) {
		element = typeOf(element) === 'number' ? this._elements[element] : element;
		if (this.currentElement && this.currentElement !== element) {
			this.currentElement.hide();
		}
		if (this.currentElement !== element) {
			element.display();
		}
		if (this.options.containerPosition !== null) {
			this.container.position();
		}

		this.fireEvent('display', element);
		this.currentElement = element;
	},

	show: function(element) {
		element = typeOf(element) === 'number' ? this._elements[element] : element;
		if (this.currentElement && this.currentElement !== element) {
			this.currentElement.hide();
//			this.currentElement.hide().chain(
//				function() { element.show(); }
//			);
		}
		if (this.currentElement !== element) {
			element.show();
		}
		if (this.options.containerPosition !== null) {
			this.container.position();
		}

		this.fireEvent('show', element);
		this.currentElement = element;
		this.parent();
	},

	next: function() {
		this.currentElement = !this.currentElement ? this.lastAddedElement : this.currentElement;
		var nextElement = this.currentElement.getNextElement();
		if (this.options.mode === 'repeat' && nextElement == null) {
			nextElement = this._elements[0];
		}
		if (nextElement) {
			this.show(nextElement);
		}
	},

	previous: function() {
		this.currentElement = !this.currentElement ? this.lastAddedElement : this.currentElement;
		var previousElement = this.currentElement.getPreviousElement();
		if (this.options.mode === 'repeat' && previousElement == null) {
			previousElement = this._elements[this._elements.length-1];
		}
		if (previousElement) {
			this.show(previousElement);
		}
	}

});