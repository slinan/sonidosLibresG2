function init() {
    $( "#socialBar" ).load( "socialBar.html" );
    $( "#navigationBar" ).load( "navigationBar.html" );
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
        url: 'https://sonidoslibres.herokuapp.com/api/audios/?categories=11&page=1&page_size=20',
        dataType: 'json',
        success: function (response) {
            var audiosListHtml = '<li class="track-head clearfix"><div class="track_title">Titulo</div><div class="track_listen">Escuchar</div><div class="track_listen">Descargar</div><div class="track_time">Votos</div><div class="track_popularity">Popularidad</div><div class="track_listen">Donar</div></li>';
            var playListHtml = '';

            var audiosList = response.results;
            for (var i=0; i < audiosList.length; i++) {
                audiosListHtml += '<li class="clearfix"><div class="track_title">' + audiosList[i].title + '</div><div class="track_listen"><span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" title="add to playlist"><i class="fa fa-play"></i></span></div><div class="track_listen"><a href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div><div class="track_time">' + audiosList[i].numOfRatings + '</div><div class="track_popularity"><ul><li class="active"></li><li class="active"></li><li class="active"></li><li class="active"></li><li class="active"></li><li class="active"></li><li class="active"></li><li></li><li></li><li></li></ul></div><div class="track_buy"><a href="#"><i class="fa fa-money"></i></a></div></li>';

                playListHtml += setTop3InPlayList(audiosList, i, playListHtml);
            }
            $('#audiosList').html(audiosListHtml);
            $('#hiddenPlaylist').html(playListHtml);

            main();
        }
    });
};

function setTop3InPlayList(audiosList, index, playListHtml) {
    if (index < 3){
        playListHtml += '<li data-title="' + audiosList[index].title + '" data-artist="' + audiosList[index].artists[0] + '" data-mp3="' + audiosList[index].audioPlay + '"></li>';
    }

    return playListHtml;
}