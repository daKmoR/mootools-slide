/*
---

name: Slide.Element
description: Slide Element for Slide
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Slide]
provides: [Slide.Element]

...
*/

Slide.Element = new Class({

	Implements: [Options, Chain, Events],

	options: {
		size: { width: 200,	height: 400 },
		setsSlideSize: false,
		current: false
	},

	previousElement: null,
	nextElement: null,
	slide: null,
	element: null,
	savedStyle: null,

	initialize: function (element, slide, options) {
		this.setOptions(options);
		this.slide = slide;
		this.element = element;
		this.savedStyle = this.element.get('style');
		this.addToSlide();
		if (this.options.setsSlideSize === true) {
			this.slide.setSize(this.options.size);
		}
//		if (this.options.isStartElement === true) {
//			//this.slide.currentElement = this;
//			this.slide.show(this);
//		}
	},

	addToSlide: function() {
		if (typeOf(this.slide.lastAddedElement) === 'object') {
			this.setPreviousElement(this.slide.lastAddedElement);
			this.slide.lastAddedElement.setNextElement(this);
		}
		this.slide.lastAddedElement = this;
		this.slide._elements.push(this);

		document.id(this.slide).grab(this.element);
	},

	hide: function() {
		this.element.setStyle('zIndex', 100);
		this.element.fade(0).get('tween').chain(
			function() {
				this.element.set('style', this.savedStyle);
				this.callChain();
			}.bind(this)
		);

		return this;
	},

	show: function() {
		this.display();
	},

	display: function() {
		this.element.set('style', this.savedStyle);
		this.element.setStyle('display', 'block');
	},

	getNextElement: function() {
		return this.nextElement;
	},

	setNextElement: function(element) {
		this.nextElement = element;
	},

	getPreviousElement: function() {
		return this.previousElement;
	},

	setPreviousElement: function(element) {
		this.previousElement = element;
	}

});

Gallery.implement({

	addElement: function(element, options) {
		var slideElement;
		var slideElementType = this.guessElementType(element);

		switch(slideElementType) {
			case 'Div':
				slideElement = this.addDiv(element, options);
				break;
			case 'Image':
				slideElement = this.addImage(element, options);
				break;
			case 'Link.Request':
				slideElement = this.addLinkRequest(element, options);
				break;
		}
		return slideElement;
	}

});
