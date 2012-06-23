/*
---

name: Slide.Pagination
description: Slide Pagination for Slide
license: MIT-style license
authors:
  - Thomas Allmer
requires: [Slide]
provides: [Slide.Pagination]

...
*/

Slide.Pagination = new Class({

	Implements: [Options, Chain, Events],

	options: {
		template: '<a data-trigger="Slide.Show" data-slide-show-element="!body [data-behavior=\'Slide\'] [data-behavior=\'Slide.Element\']:nth-child({cycle})"><span>{cycle}</span></a>',
		activeClass: 'active'
	},

	element: null,
	items: [],

	initialize: function (element, slide, options) {
		this.setOptions(options);
		this.slide = slide;
		this.element = element;

		this.build();

		this.slide.addEvent('show', function(element) {
			this.items.each(function(item) {
				if (item.element === element) {
					item.addClass(this.options.activeClass);
				} else {
					item.removeClass(this.options.activeClass);
				}
			}, this);
		}.bind(this));
	},

	build: function() {
		this.slide._elements.each(function(element, i) {
			var paginationItem = this.options.template.substitute({
				index: i,
				cycle: i+1
			});

			var temp = new Element('div');
			temp.set('html', paginationItem);
			paginationItem = temp.getElement('*');
			paginationItem.element = element;
			this.items.push(paginationItem);
			paginationItem.inject(this.element);
		}, this);
	}

});

Slide.implement({

	createPagination: function(element, options) {
		return new Slide.Pagination(element, this, options);
	}

});