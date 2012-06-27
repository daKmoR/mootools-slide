/*
---

name: Gallery
description: Gallery base class use with Implements
license: MIT-style license.
requires: Class
provides: [Gallery]

...
*/

var Gallery = new Class({

	Implements: [Options, Events],

	options: {
		auto: true,
		duration: 5000
	},

	autotimer: null,
	doAuto: false,

	initialize: function(element, options) {
		if (!(this.element = document.id(element))) return;
		this.setOptions(options);
		this.doAuto = !!this.options.auto;

		if (this.doAuto === true) {
			this.start.delay(10, this);
		}
	},

	auto: function() {
		clearTimeout(this.autotimer);
		this.autotimer = this.next.delay(this.options.duration, this);
	},

	/* you have to define your own
	next: function() {}
	 */

	display: function(element) {
		this.fireEvent('show', element);
		this.currentElement = element;
	},

	show: function(element) {
		this.fireEvent('show', element);
		this.currentElement = element;
		if (this.doAuto === true) {
			this.auto();
		}
	},

	toggle: function() {
		if (this.doAuto === true) {
			this.stop();
		} else {
			this.start();
		}
	},

	stop: function() {
		this.doAuto = false;
		clearTimeout(this.autotimer);
	},

	start: function() {
		this.doAuto = true;
		this.auto();
	},

	toElement: function() {
		return this.element;
	},

	guessElementType: function(element) {
		switch (element.get('tag')) {
			case 'img':
				return 'Image';
			case 'p':
			case 'span':
			case 'div':
				return 'Div';
		}

		if (element.get('tag') === 'a') {
			var href = element.get('href');
			var fileExt = href.substr(href.lastIndexOf('.') + 1).toLowerCase();
			switch (fileExt) {
				case 'jpg':
				case 'gif':
				case 'png':
					return 'Link.Image';
				case 'swf':
					return 'Link.Flash';
				case 'flv':
					return 'Link.FlashVideo';
				case 'mov':
					return 'Link.QuickTime';
				case 'wmv':
					return 'Link.WindowsMedia';
				case 'rv':
				case 'rm':
				case 'rmvb':
					return 'Link.RealMedia';
				case 'mp3':
					return 'Link.FlashMp3';
				default:
					if (href.charAt(0) === '#') {
						return 'Link.Inline';
					} else if (document.location.host === href.toURI().get('host') + (document.location.host.contains(':') ? ':' + href.toURI().get('port') : '')) {
						return 'Link.Request';
					} else if (href.contains('youtube.com') || href.contains('youtu.be')) {
						return 'Link.YouTube';
					} else {
						return 'Link.Iframe';
					}
			}
		}
	}

});