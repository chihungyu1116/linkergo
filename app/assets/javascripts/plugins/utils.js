(function($){
    $.browser = {};
    $.browser.msie = (function(){
        $el = $('.ie');
        return $el.length === 0 ? false : true;
    }());
    $.browser.mozilla = (function(){
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }());
    $.browser.chrome = (function(){
        return window.chrome ? true : false;
    }());

    $.scroll = {};
    $.scroll.fixedTop = function(spec){
        var scroll_top, scroll_type, $scroll_el,
            offset, method, $target_el, 

        offset = spec.offset || 0;
        method = spec.method || 'top';
        scroll_type = $.browser.msie || $.browser.mozilla ? 'body' : window;

        $target_el = $(spec.target);
        $scroll_el = $(scroll_type);
        $scroll_el.scroll(function(){
            var scroll_top, scroll_dist, scroll_begin, scroll_end,
                move_amt;

            scroll_begin = spec.begin;
            scroll_end = spec.end;
            scroll_top = $scroll_el.scrollTop();

            if(scroll_top < scroll_begin) {
                scroll_dist = 0;
            } else if(scroll_top >= scroll_begin && scroll_top <= scroll_end){
                scroll_dist = scroll_top + offset - scroll_begin;
            } else {
                scroll_dist = scroll_end - scroll_begin;
            }

            scroll_dist += 'px'
            $target_el.css(method,scroll_dist);
        });
    }
}(jQuery));