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
        case 'convocations':
            $( "#loadContent" ).load( "convocations.html", function() {
                initConvocations();
            } );
            break;
        case 'convocation-detail':
            $( "#loadContent" ).load( "convocation-detail.html", function() {
                initConvocationDetail();
            } );
            break;
        case 'convocations-agent':
            $( "#loadContent" ).load( "convocations-agent.html", function() {
                initConvocationsAgent();
            } );
            break;
        case 'register':
            $( "#loadContent" ).load( "register.html", function() {

            } );
            break;
        case 'register-admin':
            $( "#loadContent" ).load( "register-admin.html", function() {

            } );
            break;
        case 'artist-detail':
            $( "#loadContent" ).load( "artist-detail.html", function() {
                initArtistDetail();
            } );
            break;
        case 'artist':
            $( "#loadContent" ).load( "artist.html", function() {
                initArtist();
            } );
            break;
        case 'donation':
            $( "#loadContent" ).load( "donation.html", function() {
                initDonation();
            } );
            break;
        default:
            $( "#loadContent" ).load( "home.html", function() {
                initHome();
            } );
            break;
    }
}
