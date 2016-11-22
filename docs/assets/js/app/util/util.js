function getUrlParameter(sParam) {
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

function createPagination(page, pageSize, totalElements, functionName, functionParameters) {
    var maxPage = 10;
    if (!functionParameters){
        functionParameters = '';
    }
    else if (!functionParameters.endsWith(",")){
        functionParameters += ', ';
    }

    if (page < maxPage){
        page = 1;
    }

    var pagination = '<ul>' +
        '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page - 1 <= 0) ? 1 : (page - 1) ) + ', ' + pageSize + ')"><b class="fa fa-angle-left"></b></a></li>';

    var finalPage = '';
    var startPage = 1;
    var rawNumPage = totalElements / pageSize;
    var numPages = rawNumPage > Math.round(rawNumPage) ? Math.round(rawNumPage) + 1 : Math.round(rawNumPage);

    if (numPages <= 0){
        numPages = 1;
    }
    else if (numPages > maxPage){
        finalPage = '<li><a href="#">...</a></li>' +
                '<li><a href="#" onclick="' + functionName + '(' + functionParameters + numPages + ', ' + pageSize + ')">' + numPages + '</a></li>';

        numPages = maxPage;
        startPage = page;
    }

    for (var i = startPage; i < startPage + numPages; i++) {
        pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + i + ', ' + pageSize + ')">' + i + '</a></li>';
    }

    pagination += finalPage;
    pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page + 1 > numPages) ? page : page + 1) + ', ' + pageSize + ')"><b class="fa fa-angle-right"></b></a></li>' +
            '</ul>';

    $('#paginationUp').html(pagination);
    $('#paginationBottom').html(pagination);
};

function search() {
    var query = $('#searchQuery').val();

    GET('/api/search/' + query, function (response) {
        $( '#searchResults' ).show();

        $( '#queryS' ).html(query);
        $( '#totalAudiosS' ).html(response.audios.length);
        $( '#totalArtistsS' ).html(response.artists.length);
        $( '#totalAlbumsS' ).html(response.albums.length);
        $( '#totalCategoriesS' ).html(response.categories.length);

        $('#audiosListS').html(getAudiosListResults(response.audios));
        $('#artistListS').html(getArtistListResults(response.artists));
        $('#albumsListS').html(getAlbumsListResults(response.albums));
        $('#categoriesListS').html(getCategoriesListResults(response.categories));
        main();

    });
}

function getAudiosListResults(audiosList) {
    var maxAudios = 5;
    if (audiosList.length < 5){
        maxAudios = audiosList.length;
    }

    var audiosListHtml = '<li class="track-head clearfix">' +
                                 '<div class="track_title">Titulo</div>' +
                                 '<div class="track_listen">Escuchar</div>' +
                                 '<div class="track_download_count">Descargas</div>' +
                                 '<div class="track_plays_count">Reproducciones</div>' +
                                 '<div class="track_popularity">Popularidad</div>' +
                                 '<div class="track_buy">Comentar</div>' +
                             '</li>';

    for (var i=0; i < maxAudios; i++) {
        audiosListHtml += '<li class="clearfix">' +
            '<div class="track_title"><a href="#" title="Ir a la página del artista" onclick="loader(\'artist-detail\', {idArtist: ' + audiosList[i].artists[0] + '})">' + audiosList[i].title + '</a></div>' +
            '<div class="track_listen" style="display: inline-flex;">' +
            '<span data-title="' + audiosList[i].title +
                '" data-artist="' + audiosList[i].artists[0] +
                '" data-mp3="' + audiosList[i].audioPlay +
                '" data-audio-id="' + audiosList[i].id +
                '" title="Adicionar a la lista de reproducción">' +
                '<i class="fa fa-play"></i></span>' +
            '<a target="_blank" title="Descargar" onclick="audioDownload(' + audiosList[i].id + ')" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a>' +
            '</div>' +
            '<div class="track_download_count">' + audiosList[i].downloadsCount + '</div>' +
            '<div class="track_plays_count">' + audiosList[i].playCount + '</div>' +
            '<div class="track_popularity" onmouseover="mostrarEstrellas(' + i + ')" onmouseout="ocultarEstrellas(' + i + ')" >' +
                    '<div id="estrellas' + i + '" class="ec-stars-wrapper" style="display: none;">' +
                        getStarsList(audiosList[i].id, i) +
                    '</div>' +
                    '<ul id="escale' + i + '" title="' + audiosList[i].rating + ' de ' + audiosList[i].numOfRatings + ' votos">';

            audiosListHtml += getPopularity(audiosList[i].rating);

        audiosListHtml += '</ul></div><div class="track_buy"><a data-target="#modal3" data-toggle="modal" id="comment" href="#modal3"><i class="fa fa-pencil-square-o"></i></a></div></li>';
    }

    return audiosListHtml;
}

function getArtistListResults(artistList) {
    var maxArtist = 5;
    if (artistList.length < 5){
        maxArtist = artistList.length;
    }

    var artistListHtml = '<li class="track-head clearfix">' +
                                 '<div class="track_title">Nombre</div>' +
                                 '<div class="track_listen">Alias</div>' +
                                 '<div class="track_download_count">Edad</div>' +
                                 '<div class="track_plays_count">Género</div>' +
                                 '<div class="track_popularity">Donar</div>' +
                             '</li>';

    for (var i=0; i < maxArtist; i++) {
        artistListHtml += '<li class="clearfix">' +
            '<div class="track_title"><a href="#" title="Ir a la página del artista" onclick="loader(\'artist-detail\', {idArtist: ' + artistList[i].id + '})">' + artistList[i].name + '</a></div>' +
            '<div class="track_listen">' + artistList[i].nickname + '</div>' +
            '<div class="track_download_count">' + calculateAge(artistList[i].birthday) + '</div>' +
            '<div class="track_plays_count">' + getGender(artistList[i].gender) + '</div>' +
            '<div class="track_popularity"><a href="#" onclick="loader(\'donation\', {idArtist: ' + artistList[i].id + '})"><i class="fa fa-dollar"></i></a></div>' +
            '</li>';
    }

    return artistListHtml;
}

function getAlbumsListResults(albumsList) {
    var maxAlbums = 5;
    if (albumsList.length < 5){
        maxAlbums = albumsList.length;
    }

    var albumsListHtml = '<li class="track-head clearfix">' +
                                 '<div class="track_title">Titulo</div>' +
                                 '<div class="track_listen">Categoria</div>' +
                                 '<div class="track_download_count">Artista</div>' +
                             '</li>';

    for (var i=0; i < maxAlbums; i++) {
        albumsListHtml += '<li class="clearfix">' +
            '<div class="track_title">' + albumsList[i].title + '</div>' +
            '<div class="track_listen"><a href="#" title="Ir a la página de la categoría" onclick="loader(\'category-detail\', {idCategory: ' + albumsList[i].categories[0] + '})">' + albumsList[i].categories[0] + '</a></div>' +
            '<div class="track_title"><a href="#" title="Ir a la página del artista" onclick="loader(\'artist-detail\', {idArtist: ' + albumsList[i].artists[0] + '})">' + albumsList[i].artists[0] + '</a></div>' +
            '</li>';
    }

    return albumsListHtml;
}

function getCategoriesListResults(categoriesList) {
    var maxCategories = 5;
    if (categoriesList.length < 5){
        maxCategories = categoriesList.length;
    }

    var categoriesListHtml = '<li class="track-head clearfix">' +
                                 '<div class="track_title">Nombre</div>' +
                                 '<div class="track_listen">Descripción</div>' +
                             '</li>';

    for (var i=0; i < maxCategories; i++) {
        categoriesListHtml += '<li class="clearfix">' +
            '<div class="track_title"><a href="#" title="Ir a la página de la categoría" onclick="loader(\'category-detail\', {idCategory: ' + categoriesList[i].id + '})">' + categoriesList[i].name + '</a></div>' +
            '<div class="track_title">' + categoriesList[i].description + '</div>' +
            '</li>';
    }

    return categoriesListHtml;
}

function calculateAge(birthday) {
    var birthday = new Date(birthday);
    var hoy = new Date();
    var age = parseInt((hoy -birthday)/365/24/60/60/1000);

    return age;
}

function getGender(gender) {
    var genderT = 'Masculino';
    if(gender == 'M'){
        genderT = 'Masculino';
    }
    else if(gender == 'F'){
        genderT = 'Femenino';
    }
    else{
        genderT = 'LGTB';
    }

    return genderT;
}

function searchClose() {
    $( '#searchResults' ).hide();
}

function runScriptEnterSearch(e) {
    if (e.which == 13 || e.keyCode == 13) {
        search();
    }
}
