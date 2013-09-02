var Gulpio = Gulpio || {};

Gulpio.Overlay = {	
	open : function(){
		this.setHeight();
		$('#app-overlay').fadeIn(300);
		$(window).resize(Gulpio.Overlay.setHeight);
	},
	close : function(){
		$('#app-overlay').fadeOut(300);
		$(window).off('resize',Gulpio.Overlay.setHeight);
	},
	setHeight : function(){
		$('#app-overlay').css('height',$(window).height());
	}
}
