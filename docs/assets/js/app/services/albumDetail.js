function initAlbumDetail() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

    setAlbumInfo();
};

function setAlbumInfo() {
    var idAlbum = globalParameters.idAlbum;

    GET('/api/albums/' + idAlbum, function(response) {
        $('#albumName').html(response.title);
        $('#albumImage').attr( "src", response.image);

        GET('/api/artists/' + response.artists[0], function(response) {
            $('#artistName').html(response.name);
            $('#artistNickname').html(response.nickname);
            $('#btnVisit').attr('onclick', 'loader(\'artist-detail\', {idArtist: ' + response.id + '})');
        });

        setAlbumAudiosList(idAlbum);
    });
};

function setAlbumAudiosList(idAlbum) {
    GET('/api/audios?albums=' + idAlbum + '', function(response) {
        $('#totalAudios').html(response.count);
        var audiosListHtml = '<li class="track-head clearfix"><div class="track_title">Titulo</div><div class="track_listen">Escuchar</div><div class="track_download_count">Descargas</div><div class="track_plays_count">Reproducciones</div><div class="track_popularity">Popularidad</div><div class="track_buy">Comentar</div></li>';

        var audiosList = response.results;
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix">' +
                '<div class="track_title"><a href="#" title="Ir a la página del artista" onclick="loader(\'artist-detail\', {idArtist: ' + audiosList[i].artists[0] + '})">' + audiosList[i].title + '</a>></div>' +
                '<div class="track_listen" style="display: inline-flex;">' +
                '<span  data-title="' + audiosList[i].title +
                        '" data-artist="' + audiosList[i].artists[0] +
                        '" data-mp3="' + audiosList[i].audioPlay +
                        '" data-audio-id="' + audiosList[i].id +
                        '" title="Adicionar a la lista de reproducción">' +
                        '<i class="fa fa-play"></i>' +
                '</span>' +
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

            audiosListHtml += '</ul></div>' +
                '<div class="track_buy">' +
                    '<button id="comment" type="submit" onclick="showCommentArea(' + i + ')" style="background:none; outline:none; border:0;">' +
                        '<i class="fa fa-pencil-square-o" style="color: #e62948;"></i>' +
                    '</button>' +
                '</div>' +

                getCommentHtml(i, audiosList[i].id, audiosList[i].title) +

                '</li>';
        }
        $('#audiosList').html(audiosListHtml);

        main();
    });
};
