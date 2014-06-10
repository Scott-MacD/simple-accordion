;(function($) {
    function accordion() {
        'use strict';

        var accordion = $(this);
        var hash = window.location.hash;
        var useHash = hash.length > 0;
        var hashEl;

        function giveActiveClass(el) {
            el.height(el.data('h'));
            el.add(el.prev('dt')).addClass('active');
        }

        function setActiveSlide(e) {
            if (e && !$(this).parent().is('dt')) return;

            var active = accordion.children($(this).attr('href'));
            active.siblings('.active').removeClass('active');
            if (active.height() > 1) {
                active.height(0);
            } else {
                active.siblings('dd').height(0);
                giveActiveClass(active);
            }
        }

        // Init
        accordion.children('dd').each(function() {
            $(this).height('auto').data('h', $(this).height());

            if (useHash && $(this).is(hash)) {
                hashEl = $(this);
                giveActiveClass(hashEl);
            } else if(!useHash && $(this).data('default') !== undefined) {
                giveActiveClass($(this));
            } else {
                $(this).height(0);
            }
        });

        // Bind
        accordion.on('click', 'a', setActiveSlide);

        return this;
    }

    function selfInit() {
        return $('dl[data-accordion]').accordion();
    }

    $.fn.accordion = accordion;
    $.accordion = selfInit;
})(jQuery);