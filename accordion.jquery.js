;(function($) {
    function accordion(defaultTab) {
        'use strict';

        // Gives the select panel and it's title the 'active' class
        function giveActiveClass(el) {
            el.height(el.data('h'));
            el.add(el.prev('dt')).addClass('active');
        }

        // Removes 'active' class from all sibling elements and sets it to current active element if applicable
        function setActiveSlide(e) {

            // Safety net to prevent hijacking normal links
            if (e && !$(this).parent().is('dt')) return;

            // Get target panel and remove active class from all siblings
            var active = $(this).parent('dt').siblings($(this).attr('href'));
            active.siblings('.active').removeClass('active');

            // If we clicked the currently open panel, toggle it shut, else close siblings and activate current panel
            if (active.height() > 1) {
                active.height(0);
            } else {
                active.siblings('dd').height(0);
                giveActiveClass(active);
            }
        }

        // Run for each individual definition list
        $(this).each(function() {

            // If this isn't a definition list exit early
            if ($(this).prop('tagName').toLowerCase() !== 'dl') return;

            var hash = window.location.hash;
            var tab = defaultTab || $(this).data('accordion');
            var useHash = hash.length > 0 && $(this).has(hash).length > 0;

            // Iterate each child to decide if it should be active or not, and store height information
            $(this).children('dd').each(function() {
                var hashMatches = useHash && $(this).is(hash);
                var isDefault = !useHash && $(this).is(tab);

                // Temporarily switch to auto height to get length with content,
                // the element gets re-hidden where appropriate without ever getting drawn to the screen
                $(this).height('auto').data('h', $(this).height());

                // Set panel as active if applicable
                if (hashMatches || isDefault) {
                    giveActiveClass($(this));
                } else {
                    $(this).height(0);
                }

            });
        });

        // Bind clicks
        $(this).on('click', 'a', setActiveSlide);

        // Return jQuery object
        return this;
    }

    // Alternate init method that initiates on all definition lists with the accordion class
    function selfInit(defaultTab) {
        return $('dl.accordion').accordion(defaultTab);
    }

    // Actually extend jQuery here
    $.fn.accordion = accordion;
    $.accordion = selfInit;

})(jQuery);