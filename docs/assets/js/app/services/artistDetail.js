function initArtistDetail() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

    setArtistDetail();
};

function setArtistDetail() {
    GET('/api/artists/' + globalParameters.idArtist, function(response) {
        $('#artistName').html(response.name);
        $('#artistNickname').html( response.nickname);
        $('#artistDescription').html( response.description);
        $('#artistNameTec').html( response.name);
        $('#artistAge').html(calculateAge(response.birthday));
        $('#artistGenere').html(getGender(response.gender));
        $('#artistImage').attr( "src", response.image);
        $('#artistDescription').html(response.description);
        $('#btnDonate').attr('onclick', 'loader("donation", {idArtist: ' + globalParameters.idArtist + '})');

        setArtistAudiosList(globalParameters.idArtist, 1, 10);
    });
};

function setArtistAudiosList(idArtist, page, pageSize) {
    GET('/api/audios?artists=' + idArtist + '&page=' + page + '&page_size=' + pageSize, function(response) {
        $('#totalAudios').html(response.count);

        var audiosListHtml = '<li class="track-head clearfix"><div class="track_title">Titulo</div><div class="track_listen">Escuchar</div><div class="track_download_count">Descargas</div><div class="track_plays_count">Reproducciones</div><div class="track_popularity">Popularidad</div><div class="track_buy">Comentar</div></li>';

        var audiosList = response.results;
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix">' +
                '<div class="track_title">' + audiosList[i].title + '</div>' +
                '<div class="track_listen" style="display: inline-flex;">' +
                    '<span  data-title="' + audiosList[i].title + '" ' +
                            'data-artist="' + audiosList[i].artists[0] + '" ' +
                            'data-mp3="' + audiosList[i].audioPlay + '" ' +
                            'data-audio-id="' + audiosList[i].id + '" ' +
                            'title="Adicionar a la lista de reproducción">' +
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

        createPagination(page, pageSize, response.count, 'setArtistAudiosList', idArtist + '');

        main();
    });
};