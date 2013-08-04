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
        var scroll_top, scroll_type, begin, end, offset,
            $target_el, $scroll_el;

        begin = spec.begin;
        end = spec.end;
        offset = spec.offset;
        scroll_type = $.browser.msie || $.browser.mozilla ? 'body' : window;



        $target_el = $(spec.target);
        $scroll_el = $(scroll_type);
        $scroll_el.scroll(function(){
            scroll_top = $scroll_el.scrollTop();
            if(scroll_top >= begin && scroll_top <= end){
                $target_el.css('top', scroll_top + 2*offset - begin);
            }

            console.log('gg', scroll_top + offset, scroll_top, begin, end);
        });
    }
}(jQuery));