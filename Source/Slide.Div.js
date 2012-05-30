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

	Extends: Slide.Element

});

Slide.implement({

	addDiv: function(div, options) {
		return new Slide.Div(div, this, options);
	}

});