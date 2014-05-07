var bb = bb ? bb : {};
(function($) {
	$.extend(bb,{
		menu : {
			bb : null,
			$handle : null,
			$menu : null,
			menuInClass : 'menu-in',
			menuShowClass : 'menu-show',
			showTimeout : null,
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			init : function () {
				var self = this;
				self.$handle = $('.action-menu');
				self.$menu = $('#menu');
				self.$handle.on('click.menu', function(event) {
					event.preventDefault();
					if (self.bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else if(!self.bb.settings.$html.hasClass(self.menuShowClass)) {
						self.openMenu(event);
					}
				});
				self.bb.settings.$content.on('click.menu', function(event) {
					if (self.bb.settings.$html.hasClass(self.menuInClass) || self.bb.settings.$html.hasClass(self.menuShowClass)) {
						self.closeMenu(event);
					}
				});
			},
			openMenu : function (event) {
				var self = this;
				self.bb.settings.$html.addClass(self.menuShowClass);
				if (self.showTimeout !== null) {
					clearTimeout(self.showTimeout);
				}
				self.showTimeout = setTimeout(function () {
					self.bb.settings.$html.addClass(self.menuInClass);
					clearTimeout(self.showTimeout);
				}, 10);
			},
			closeMenu : function (event) {
				var self = this;
				if (self.bb.settings.transitionEnd === 'noTransitionEnd') {
					self.bb.settings.$html.removeClass(self.menuShowClass);
				} else {
					self.bb.settings.$content.on(self.bb.settings.transitionEnd + '.menu', function () {
						self.bb.settings.$html.removeClass(self.menuShowClass);
						self.bb.settings.$content.off(self.bb.settings.transitionEnd + '.menu');
					});
				}
				self.bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.menu.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.menu.init();
	});
}(jQuery));
