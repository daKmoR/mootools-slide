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

	display: function(callParent, noCall_in) {
		if (noCall_in !== true) {
			this._display(true);
		}
		if (callParent === true) {
			this.parent();
		}
	},

	_display: function(callIn) {
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