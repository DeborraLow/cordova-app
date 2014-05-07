var bb = bb ? bb : {};
(function($) {
	$.extend(bb,{
		search : {
			bb : null,
			$handle : null,
			$search : null,
			$input: null,
			searchInClass: 'search-in',
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			init: function () {
				var self = this;
				self.$search = $('.global-search-header');
				self.$input = self.$search.find('.global-search-input');
				self.$handle = $('#action-search');
				self.$handle.on('click.search', function(event) {
					event.preventDefault();
					// Check if header search is present
					if ( !self.$search.length ) {
						return;
					}
					if (self.bb.settings.$html.hasClass(self.searchInClass)) {
						self.closeSearch(event);
					} else {
						self.openSearch(event);
					}
				});
			},
			openSearch: function (event) {
				var self = this;
				self.bb.settings.$html.addClass(self.searchInClass).removeClass(self.bb.menu.menuInClass);
				if(!Modernizr.appleios) {
					self.$input.focus();
				}
			},
			closeSearch: function (event) {
				var self = this;
				self.bb.settings.$html.removeClass(self.searchInClass);
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.search.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.search.init();
	});
}(jQuery));
