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
        $('#artistAge').html( response.age);
        $('#artistGenere').html( response.genere);
        $('#artistImage').attr( "src", response.image);
        $('#artistDescription').html(response.description);

        setArtistAudiosList(globalParameters.idArtist);
    });
};

function setArtistAudiosList(idArtist) {
    GET('/api/audios?artists=' + idArtist, function(response) {
        $('#totalAudios').html(response.count);

        var audiosListHtml = '<li class="track-head clearfix"><div class="track_title">Titulo</div><div class="track_listen">Escuchar</div><div class="track_download_count">Descargas</div><div class="track_plays_count">Reproducciones</div><div class="track_popularity">Popularidad</div><div class="track_buy">Comentar</div></li>';

        var audiosList = response.results;
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix"><div class="track_title">' + audiosList[i].title + '</div><div class="track_listen" style="display: inline-flex;"><span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" title="Adicionar a la lista de reproducción"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + audiosList[i].id + ')" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div><div class="track_download_count">' + audiosList[i].downloadsCount + '</div><div class="track_plays_count">' + audiosList[i].playCount + '</div><div class="track_popularity"><ul title="' + audiosList[i].rating + ' de ' + audiosList[i].numOfRatings + ' votos">';

            var rating = (Math.floor(audiosList[i].rating) * 2);
            audiosListHtml += getPositiveRating(rating) + getNegativeRating(rating);

            audiosListHtml += '</ul></div><div class="track_buy"><a data-target="#modal3" data-toggle="modal" id="comment" href="#modal3"><i class="fa fa-pencil-square-o"></i></a></div></li>';
        }
        $('#audiosList').html(audiosListHtml);

        main();
    });
};

function getPositiveRating(rating) {
    var positiveRating = '';
    for (var j = 0; j < rating; j++){
        positiveRating += '<li class="active"></li>';
    }

    return positiveRating;
}

function getNegativeRating(rating) {
    var negativeRating = '';
    for (var j = 0; j < 10 - rating; j++){
        negativeRating += '<li></li>';
    }

    return negativeRating;
}