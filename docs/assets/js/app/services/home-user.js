function setTopsForUser() {
    getTopMeRatingAudios();
    listCategoriesForAudiosUpload();
};

function getTopMeRatingAudios() {
    GET('/api/audios?ordering=-rating&page=1&page_size=5&artists=' + USER.user.id, function (response) {
        var topsHtml = '';
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis audios más votados</h1></header>';

        var audiosHtml = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            audiosHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><span data-title="' + response.results[i].title + '" data-artist="' + response.results[i].title + '" data-mp3="' + response.results[i].audioPlay + '" data-download="' + response.results[i].audioDownload + '" data-audio-id="' + response.results[i].id + '" title="Adicionar a la lista de reproducción"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + response.results[i].id + ')" href="' + response.results[i].audioDownload + '"><i class="fa fa-download"></i></a></div>';
        }
        topsHtml += audiosHtml + '</div>';

        getTopMeDownloadAudios(topsHtml);

    });
}

function getTopMeDownloadAudios(topsHtml) {
    GET('/api/audios?ordering=-downloadsCount&page=1&page_size=5&artists=' + USER.user.id, function (response) {
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis audios más descargados</h1></header>';

        audiosHtml = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            audiosHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><span data-title="' + response.results[i].title + '" data-artist="' + response.results[i].title + '" data-mp3="' + response.results[i].audioPlay + '" data-download="' + response.results[i].audioDownload + '" data-audio-id="' + response.results[i].id + '" title="Adicionar a la lista de reproducción"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + response.results[i].id + ')" href="' + response.results[i].audioDownload + '"><i class="fa fa-download"></i></a></div>';
        }
        topsHtml += audiosHtml + '</div>';

        getTopMePlayAudios(topsHtml);

    });
}

function getTopMePlayAudios(topsHtml) {
    GET('/api/audios?ordering=-playCount&page=1&page_size=5&artists=' + USER.user.id, function (response) {
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis audios más reproducidos</h1></header>';

        audiosHtml = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            audiosHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><span data-title="' + response.results[i].title + '" data-artist="' + response.results[i].title + '" data-mp3="' + response.results[i].audioPlay + '" data-download="' + response.results[i].audioDownload + '" data-audio-id="' + response.results[i].id + '" title="Adicionar a la lista de reproducción"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + response.results[i].id + ')" href="' + response.results[i].audioDownload + '"><i class="fa fa-download"></i></a></div>';
        }
        topsHtml += audiosHtml + '</div>';

        getTopMeConvocatoriesUser(topsHtml);
    });
}

function getTopMeConvocatoriesUser(topsHtml) {
    GET('/api/convocations?page=1&page_size=5', function (response) {
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis Convocatorias</h1></header>';

        var convocatorias = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            convocatorias += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><label> - Fecha Vencimiento: ' + response.results[i].dateEnd + '</label></div>';
        }
        topsHtml += convocatorias + '</div>';

        $('#personalitationUser').html(topsHtml);
        setInitialPlayList();
    });
};

function listCategoriesForAudiosUpload() {
    GET('/api/categories', function (response) {
        var listCategoriesHtml = '';

        for (var i = 0; i < response.results.length; i++) {
            listCategoriesHtml += '<option value="' + response.results[i].id + '">' + response.results[i].name + '</option>';
        }
        $('#categoriesList').html(listCategoriesHtml);
    });
}
