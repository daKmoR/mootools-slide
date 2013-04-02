/*
---

name: Gallery.Link.Request
description: Gallery Element for Gallery
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Gallery.Link, Core/Request.HTML, More/Spinner]
provides: [Gallery.Link.Request]

...
*/

Gallery.Link.Request = new Class({

	Extends: Gallery.Link,

	options: {
		setsSlideSize: true,
		requestfilter: ''
	},

	loaded: false,
	href: '',

	initialize: function (element, slide, options) {
		this.setOptions(options);
		this.href = element.get('href');
		this.element = element;

		var div = new Element('div', {'class': 'linkRequest'});
		div.setStyle('height', this.getSize().height);
		div.setStyle('width', this.getSize().width);
		div.replaces(this.element);
		this.element = div;

		this.request = new Request.HTML({
			method: 'get',
			autoCancel: true,
			url: this.href,
			filter: this.options.requestfilter,
			update: this.element,
			useSpinner: true,
			onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
				this.loaded = true;
				this.display(true, true);
				this.fireEvent('linkRequestLoaded', div);
			}.bind(this)
		});

		this.parent(this.element, slide, options);
	},

	_display: function() {
		this.request.send();
		this.request.getSpinner().element.setStyle('left', 0);
		this.request.getSpinner().element.setStyle('top', 0);
	}

});

Gallery.implement({

	addLinkRequest: function(link, options) {
		return new Gallery.Link.Request(link, this, options);
	}

});