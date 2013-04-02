/*
---

name: Gallery.Element
description: Gallery Element for Gallery
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Gallery]
provides: [Gallery.Element]

...
*/

Gallery.Element = new Class({

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
			this.slide.setSize(this.getSize());
		}
//		if (this.options.isStartElement === true) {
//			//this.slide.currentElement = this;
//			this.slide.show(this);
//		}
	},

	getSize: function() {
		return this.options.size;
	},

	addToSlide: function() {
		if (typeOf(this.slide.lastAddedElement) === 'object') {
			this.setPreviousElement(this.slide.lastAddedElement);
			this.slide.lastAddedElement.setNextElement(this);
		}
		this.slide.lastAddedElement = this;
		this.slide.elements.push(this);

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
		this.display(true);
		this.fireEvent('show', this.element);
	},

	display: function(fromShow) {
		fromShow = !!(fromShow === true);
		this.element.set('style', this.savedStyle);
		this.element.setStyle('display', 'block');
		if (!fromShow) {
			this.fireEvent('display', this.element);
		}
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
