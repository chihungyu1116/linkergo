$(function(){
	if($.browser.msie10){
		// Add viewport support for IE10
		var $ms_viewport_style = $('style');
		$ms_viewport_style.html('@-ms-viewport{width:auto!important}');
		$('head').append($ms_viewport_style);

		// Add class IE to body
		$('body').addClass('ie').addClass('ie10');
	}
});