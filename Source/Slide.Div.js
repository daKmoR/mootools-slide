/*
---

name: Slide.Div
description: Slide Element for Slide
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Slide.Element]
provides: [Slide.Div]

...
*/

Slide.Div = new Class({

	Extends: Slide.Element,

	show: function() {
		this.parent();
		this.element.tween('bottom', [-this.slide.getSize().height, 0]);
//		var triggers = this.element.getTriggers();
//		console.log(triggers);
	},

//	show: function() {
//		this.element.set('style', this.savedStyle);
//		this.element.setStyle('display', 'block');
//	},

	hide: function() {
		//this.parent();
		//this.element.setStyle('zIndex', 100);
		this.element.tween('bottom', [0, -this.slide.getSize().height]);
	}

//	hide: function() {
//		this.element.setStyle('zIndex', 100);
//		this.element.fade(0).get('tween').chain(
//			function() {
//				this.element.set('style', this.savedStyle);
//				this.callChain();
//			}.bind(this)
//		);
//
//		return this;
//	},

});

Slide.implement({

	addDiv: function(div, options) {
		return new Slide.Div(div, this, options);
	}

});