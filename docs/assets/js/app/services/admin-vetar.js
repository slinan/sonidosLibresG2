function initAdminVetar() {
    setAdminVetarAudiosList(1, 10);
}

function setAdminVetarAudiosList(page, pageSize) {
    GET('/api/audios?page=' + page + '&page_size=' + pageSize, function (response) {
        var audiosListHtml = '<li class="track-head clearfix">' +
                                '<div class="track_title">Titulo</div>' +
                                '<div class="track_listen">Escuchar</div>' +
                                '<div class="track_download_count">Descargas</div>' +
                                '<div class="track_plays_count">Reproducciones</div>' +
                                '<div class="smallColum">Activa</div>' +
                                '<div class="smallColum">Vetada</div>' +
                                '<div class="smallColum">Vetar</div>' +
                             '</li>';

        var audiosList = response.results;
        for (var i=0; i < audiosList.length; i++) {
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
                '<div class="track_plays_count">' + audiosList[i].playCount + '</div>';

            var active = audiosList[i].active == true ? 'SI' : 'NO';
            var vetoed = audiosList[i].vetoed == true ? 'SI' : 'NO';

            audiosListHtml += '<div class="smallColum">' + active + '</div>' +
                '<div class="smallColum">' + vetoed + '</div>' +
                '<div class="smallColum">';

                if (vetoed == 'SI') {
                    audiosListHtml += '<a href="#" onclick="vetoed(' + audiosList[i].id + ', ' + page + ', ' + pageSize + ')">' +
                        '<i class="fa fa-crosshairs"></i>' +
                        '</a>';
                }

                audiosListHtml += '</div>' +
                '</li>';
        }
        $('#audiosList').html(audiosListHtml);

        createPagination(page, pageSize, response.count, 'setAdminVetarAudiosList');
        main();
    });
};

function vetoed(idAudio, page, pageSize) {
    GET('/api/vetar/' + idAudio, function (response) {
        if (response){
            setAdminVetarAudiosList(page, pageSize);
        }
    });
};
