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
        default:
            $( "#loadContent" ).load( "home.html", function() {
                initHome();
            } );
            break;
    }
}
