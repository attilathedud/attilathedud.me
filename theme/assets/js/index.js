$(function () {
    var page = 2;
    var url_blog = window.location;
    var $window = $(window);

    $window.scroll(function () {
        if ($window.scrollTop() + $window.height() == $(document).height()) {
            if (page <= max_pages) {
                $('.loading').fadeIn();
                
                $.get((url_blog + '/page/' + page), function (content) {
                    $('.content').append($(content).find(".post"));
                    page = page + 1;
                    $('.loading').fadeOut();
                });
            }
        }
    });

    $('.new-nav a').each(function () {
        $(this).css('border-bottom', '5px solid rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',.8)');
    });
});
