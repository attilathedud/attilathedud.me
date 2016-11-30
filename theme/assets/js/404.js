setInterval( function() {
    var all_headers = document.querySelectorAll( '.error-404 h1' );
 
    for ( var i = 0; i < all_headers.length; i++ ) {
        all_headers[i].innerHTML = ( all_headers[i].innerHTML == "4" ? "0" : "4" );
    }
}, 500 );
