$(function () {
    var page = 2;
    var url_blog = window.location;
    var $window = $(window);

    $window.scroll(function () {
        if ($window.scrollTop() + $window.height() == $(document).height()) {
            $.get((url_blog + '/page/' + page), function (content) {
                if (page <= max_pages) {
                    $('.content').append($(content).find(".post"));
                    page = page + 1;
                }
            });
        }
    });

    $('.new-nav a').each(function () {
        $(this).css('border-bottom', '5px solid rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',.8)');
    });
});
