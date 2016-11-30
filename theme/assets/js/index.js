var all_navs = document.querySelectorAll( '.new-nav a' );
 
for ( var i = 0; i < all_navs.length; i++ ) {
    all_navs[i].style.borderBottom = '5px solid rgba(' + Math.floor( Math.random( ) * 255 ) + ',' + Math.floor( Math.random( ) * 255 ) + ',' + Math.floor( Math.random( ) * 255 ) + ',.8)';
}
