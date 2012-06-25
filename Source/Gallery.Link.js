/*
---

name: Gallery.Link
description: Gallery Element for Gallery
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Gallery.Element]
provides: [Gallery.Link]

...
*/

Gallery.Link = new Class({

	Extends: Gallery.Element,

	options: {
		width: 200,
		height: 400
	},

	initialize: function (element, slide, options) {
		this.parent(element, slide, options);
	},

	show: function(callParent, noCall_in) {
		if (noCall_in !== true) {
			this._show(true);
		}
		if (callParent === true) {
			this.parent();
		}
	},

	_show: function(callIn) {
		if (callIn == true) {
			this.show(true);
		}
	}

});

Gallery.implement({

	addLink: function(link, options) {
		return new Gallery.Link(link, this, options);
	}

});