$(function () {
    var blog_url = window.location.href;
    var is_loading = false;

    //taken from https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js/21903119#21903119
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var getStrippedUrl = function getStrippedUrl(url) {
        if( url.indexOf("/?") != -1 ) {
            return url.substring(0, url.indexOf("/?") + 1);
        }
        else {
            return url;
        }
    };

    $('.nav-bar a, .nav-bar-mobile a').each(function () {
        $(this).css('border-bottom', '5px solid rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',.8)');
    });

    $('.nav-bar-mobile .icon').on('click', function() {
        $('.nav-bar-mobile ul').toggle();
    });

    if($('article').length > 1) {
        var page = parseInt(getUrlParameter('page'));
        var chunks_loaded = 1;

        if( page == undefined || isNaN(page) || page < 2 || page > max_pages ) {
            page = 1;
        }
        else {
            var pages = {};

            is_loading = true;
            $('.loading').fadeIn();

            var blog_url_without_param = getStrippedUrl(blog_url);
           
            for( var i = 2; i <= page; i++ ) {
                $.get((blog_url_without_param + 'page/' + i), function (content) {
                    var page_title = $(content).filter('title').text();
                    page_title = page_title.substring(page_title.indexOf("Page") + 4, page_title.length - 1);
                    
                    if( !isNaN(parseInt(page_title)) ) {
                        pages[ parseInt(page_title) ] = $(content).find(".post");
                        chunks_loaded = chunks_loaded + 1;
                        if( chunks_loaded == page ) {
                            document.dispatchEvent(new Event('chunks_loaded'));
                        }
                    }
                });
            }
        }

        document.addEventListener('chunks_loaded', function (e) {
            for( var page_key in pages ) {
                $('.content').append(pages[page_key]);
            }

            $('.loading').fadeOut();
            is_loading = false;
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                if (page + 1 <= max_pages && !is_loading) {
                    page = page + 1;
                    is_loading = true;
                    $('.loading').fadeIn();
             
                    var blog_url_without_param = getStrippedUrl(blog_url);

                    $.get((blog_url_without_param + 'page/' + page), function (content) {
                        $('.content').append($(content).find(".post"));
    
                        if( history.pushState ) {
                            var url = blog_url_without_param;
                            url += "?page=" + page;
                            history.replaceState({path:url}, '', url);
                        }

                        $('.loading').fadeOut();
                        is_loading = false;
                    });
                }
            }
        });

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
