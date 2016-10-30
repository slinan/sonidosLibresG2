function loader(page, param) {
    globalParameters = param;
    switch (page){
        case 'home':
            $( "#loadContent" ).load( "home.html", function() {
                initHome();
            });
            break;
        case 'category-detail':
            $( "#loadContent" ).load( "category-detail.html", function() {
                initCategoryDetail();
            } );
            break;
        case 'albums':
            $( "#loadContent" ).load( "albums.html", function() {
                initAlbums();
            } );
            break;
        case 'album-detail':
            $( "#loadContent" ).load( "album-detail.html", function() {
                initAlbumDetail();
            } );
            break;
        case 'register':
            $( "#loadContent" ).load( "register.html", function() {

            } );
            break;
        default:
            $( "#loadContent" ).load( "home.html", function() {
                initHome();
            } );
            break;
    }
}
