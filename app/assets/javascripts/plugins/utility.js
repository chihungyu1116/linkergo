(function($){
    $.browser = {};
    $.browser.msie = (function(){
        $el = $('.ie');
        return $el.length === 0 ? false : true;
    }());
    $.browser.msie10 = (function(){
        return navigator.userAgent.match(/IEMobile\/10\.0/)
    }());
    $.browser.mozilla = (function(){
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }());
    $.browser.chrome = (function(){
        return window.chrome ? true : false;
    }());
}(jQuery));