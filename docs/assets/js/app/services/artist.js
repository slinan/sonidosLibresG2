function initArtist(){
    loadAllArtist(1, 10);
}

function loadTop7Artist() {
    GET('/api/topRandomArtists/7', function (response) {
        if (response.length > 0) {
            $('#menuArtistFeaturedName').html(response[0].name);
            $('#menuArtistFeaturedName').attr('onclick', 'loader(\"artist-detail\", {idArtist:"' + response[0].id + '"})');
            $('#menuArtistFeaturedDescription').html(response[0].description);
            $('#menuArtistFeaturedImage').attr('src', response[0].image);

            var artistList= '';
            for(var i = 1; i < response.length; i++){
                artistList += '<li><a href="#" onclick="loader(\'artist-detail\', {idArtist:' + response[i].id + '})">' + response[i].name + '</a></li>';
            }
            artistList += '<li class="to-page"><a href="#" onclick="loader(\'artist\', {})">Ver todos</a></li>';
            $('#menuArtistList').html(artistList);
        }
    });
}

function loadAllArtist(page, pageSize) {
    GET('/api/artists?page=' + page + '&page_size=' + pageSize, function (response) {
        if (response.count > 0) {

            var artistList = '';
            for(var i = 0; i < response.results.length; i++){
                artistList +=   '<div class="col-lg-3 col-md-3 col-sm-4 xs-12">' +
                                    '<div class="artist">' +
                                        '<img src="' + response.results[i].image + '" alt=""/>' +
                                        '<a href="#" onclick="loader(\'artist-detail\', {idArtist:' + response.results[i].id + '})">' + response.results[i].name + '</a>' +
                                    '</div>' +
                                '</div>';
            }

            $('#artistList').html(artistList);

            createPagination(page, pageSize, response.count, 'loadAllArtist');
        }
    });
}
