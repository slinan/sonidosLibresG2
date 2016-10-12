function initAlbumDetail() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

    setCategoryInfo();
};

function setAlbumInfo() {
    var idAlbum = globalParameters.idAlbum;
    var description = 'Este es un ejemplo de la descripción del álbum'
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/albums/' + idAlbum,
        dataType: 'json',
        success: function (response) {
            $('#albumName').html(response.title);
            $('#albumImage').attr( "src", response.image);
            $('#totalAudios').html(10);
            $('#albumDescription').html(description);

            setAlbumAudiosList(idAlbum);
        }
    });
};

function setAlbumAudiosList(idAlbum) {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/audios?categories=' + idAlbum + '&page=1&page_size=10',
        dataType: 'json',
        success: function (response) {
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
        }
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