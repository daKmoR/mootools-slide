/*
---

name: Gallery.Div
description: Gallery Element for Gallery
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Gallery.Element]
provides: [Gallery.Div]

...
*/

Gallery.Div = new Class({

	Extends: Gallery.Element,

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

Gallery.implement({

	addDiv: function(div, options) {
		return new Gallery.Div(div, this, options);
	}

});