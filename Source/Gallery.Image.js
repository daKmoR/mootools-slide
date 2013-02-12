/*
---

name: Gallery.Image
description: Gallery Element for Gallery
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Gallery.Element]
provides: [Gallery.Image]

...
*/

Gallery.Image = new Class({

	Extends: Gallery.Element,

	options: {
		size: { width: 'auto', height: 'auto' },
		adjust: 'fitIn' //['fitIn' (defaults), 'crop']
	},

	initialize: function (image, slide, options) {
		this.setOptions(options);
		this.guessSize(image);

		this.parent(image, slide, options);
	},

	guessSize: function(image) {
		if (this.options.size.width === 'auto') {
			this.options.size.width = image.get('width').toInt();
		}
		if (this.options.size.height === 'auto') {
			this.options.size.height = image.get('height').toInt();
		}
	},

	display: function() {
		this.parent();
		this.adjustSizeTo(this.slide.getSize());
	},

	show: function() {
		this.parent();
		this.adjustSizeTo(this.slide.getSize());
	},

	getSize: function() {
		return this.options.size;
	},

	setSize: function(size) {
		this.element.setStyles(size);
	},

	adjustSizeTo: function(sizeTo) {
		var ratiox = sizeTo.width / this.getSize().width,
			ratioy = sizeTo.height / this.getSize().height,
			ratio = ratioy < ratiox ? ratioy : ratiox;
		if (this.options.adjust === 'crop') {
			ratio = ratioy > ratiox ? ratioy : ratiox;
		}

		if (ratio !== 1) {
			var newSize = { width: this.getSize().width * ratio, height: this.getSize().height * ratio };
			this.setSize(newSize);

			if (this.options.adjust === 'crop') {
				if (ratioy > ratiox) {
					this.element.setStyles({
						'left': '50%',
						'margin-left': newSize.width/2*-1
					});
				} else {
					this.element.setStyles({
						'top': '50%',
						'margin-top': newSize.height/2*-1
					});
				}
			}

			if (this.options.adjust === 'fitIn') {
				var paddings = {
					'padding-left': (sizeTo.width - newSize.width) !== 0 ? (sizeTo.width - newSize.width)/2 : 0,
					'padding-right': (sizeTo.width - newSize.width) !== 0 ? (sizeTo.width - newSize.width)/2 : 0,
					'padding-top': (sizeTo.height - newSize.height) !== 0 ? (sizeTo.height - newSize.height)/2 : 0,
					'padding-bottom': (sizeTo.height - newSize.height) !== 0 ? (sizeTo.height - newSize.height)/2 : 0
				};
				this.element.setStyles(paddings);
			}
		}
	}

});

Gallery.implement({

	addImage: function(image, options) {
		return new Gallery.Image(image, this, options);
	}

});