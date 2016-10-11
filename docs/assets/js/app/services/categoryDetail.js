function init() {
    $( "#socialBar" ).load( "socialBar.html" );
    $( "#navigationBar" ).load( "navigationBar.html" );
    $( "#player" ).load( "player.html" );
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    $( "#footer" ).load( "footer.html" );
    setCategoryInfo();
};

function setCategoryInfo() {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/categories/' + getUrlParameter('id'),
        dataType: 'json',
        success: function (response) {
            $('#categoryName').html(response.name);
            $('#categoryNameSub').html(response.name);
            $('#categoryImage').attr( "src", response.image);
            $('#totalAudios').html(10);
            $('#categoryDescription').attr( "src", response.description);

            var relatedCategoriesHtml = '';
            var relatedCategories = response.relatedCategories;
            for (var i=0; i < relatedCategories.length; i++) {
                relatedCategoriesHtml += '<div class="related-album"><a href="/sonidosLibresG2/docs/category-detail.html#/?id=' + relatedCategories[i].id + '"><img src="' + relatedCategories[i].image + '"alt="/"></a><h3>' + relatedCategories[i].name + '</h3><h4>Categoría</h4></div>';
            }
            $('#relatedCategories').html(relatedCategoriesHtml);

            setCategoryAudiosList();
        }
    });
};

function setCategoryAudiosList() {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/audios/?categories=11&page=1&page_size=10',
        dataType: 'json',
        success: function (response) {
            var audiosListHtml = '<li class="track-head clearfix"><div class="track_title">Titulo</div><div class="track_listen">Escuchar</div><div class="track_listen">Descargar</div><div class="track_popularity">Votos</div><div class="track_popularity">Popularidad</div><div class="track_listen">Donar</div></li>';
            var playListHtml = '';

            var audiosList = response.results;
            for (var i=0; i < audiosList.length; i++) {
                audiosListHtml += '<li class="clearfix"><div class="track_title">' + audiosList[i].title + '</div><div class="track_listen"><span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" title="add to playlist"><i class="fa fa-play"></i></span></div><div class="track_listen"><a target="_blank" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div><div class="track_popularity">' + audiosList[i].rating + ' de ' + audiosList[i].numOfRatings + ' votos</div><div class="track_popularity"><ul>';

                var rating = (Math.floor(audiosList[i].rating) * 2);
                audiosListHtml += getPositiveRating(rating) + getNegativeRating(rating);

                audiosListHtml += '</ul></div><div class="track_listen"><a href="#"><i class="fa fa-money"></i></a></div></li>';

                playListHtml = setTop3InPlayList(audiosList, i, playListHtml);
            }
            $('#audiosList').html(audiosListHtml);
            $('#hiddenPlaylist').html(playListHtml);

            main();
        }
    });
};

function setTop3InPlayList(audiosList, index, playListHtml) {
    if (index < 3){
        playListHtml += '<li data-title="' + audiosList[index].title + '" data-artist="' + audiosList[index].artists[0] + '" data-mp3="' + audiosList[index].audioPlay + '" data-download="' + audiosList[index].audioDownload + '" data-audio-id="' + audiosList[index].id + '"></li>';
    }

    return playListHtml;
}

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