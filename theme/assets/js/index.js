$(function () {
    var page = 2;
    var url_blog = window.location;
    var $window = $(window);
    var is_loading = false;

    $window.scroll(function () {
        if ($window.scrollTop() + $window.height() == $(document).height()) {
            if (page <= max_pages && !is_loading) {
                is_loading = true;
                $('.loading').fadeIn();
                
                $.get((url_blog + '/page/' + page), function (content) {
                    $('.content').append($(content).find(".post"));
                    page = page + 1;
                    $('.loading').fadeOut();
                    is_loading = false;
                });
            }
        }
    });

    $('.nav-bar a, .nav-bar-mobile a').each(function () {
        $(this).css('border-bottom', '5px solid rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',.8)');
    });

    $('.nav-bar-mobile .icon').on('click', function() {
        $('.nav-bar-mobile ul').toggle();
    });

    if($('article').length > 1) {
        $(document).on('click', 'article', function() {
            window.location = $(this).find('h2').find('a').attr('href');
        });

        $(document).on('mouseenter', 'article', function() {
            $(this).addClass('post-scaled');
        });

        $(document).on('mouseleave', 'article', function() {
            $(this).removeClass('post-scaled');
        });

    }
});
