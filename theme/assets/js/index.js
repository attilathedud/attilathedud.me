(function ($, undefined) {
    "use strict";

    $(document).ready(function () {
        /* Keeping in there in case we need to every post videos */
        var $postContent = $(".post-content");
        $postContent.fitVids();

        //Set each list item to a random bottom border
        $('.new-nav a').each( function() {
            $( this ).css( 'border-bottom', '5px solid rgba(' + Math.floor( Math.random( ) * 255 ) + ',' + Math.floor( Math.random( ) * 255 ) + ',' + Math.floor( Math.random( ) * 255 ) + ',.8)' );
        });
    });
})(jQuery);
