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
		if (this.options.hideFx === 'bottom') {
			this.element.tween('bottom', [-this.slide.getSize().height, 0]);
		}
	},

	hide: function() {
		if (this.options.hideFx === 'bottom') {
			this.element.tween('bottom', [0, -this.slide.getSize().height]);
		} else {
			this.parent();
		}
	}

});

Gallery.implement({

	addDiv: function(div, options) {
		return new Gallery.Div(div, this, options);
	}

});