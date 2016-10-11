function init() {
    $( "#socialBar" ).load( "socialBar.html" );
    $( "#navigationBar" ).load( "navigationBar.html" );
    $( "#player" ).load( "player.html" );
    $( "#upload" ).load( "upload.html" );
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    $( "#footer" ).load( "footer.html" );
    setCategories();
};

function setCategories() {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/categoriesTopRating/5',
        dataType: 'json',
        success: function (response) {
            var categoriesHtml = '';
            var listCategoriesHtml = '';

            for (var i = 0; i < response.length; i++) {
                categoriesHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>' + response[i].name + '</h1><a class="h-right more"href="/sonidosLibresG2/docs/category-detail.html?id=' + response[i].id + '"><span class="icon icon-more"></span>Ver más</a></header>';

                var audiosHtml = '';
                var cont = 1;
                for (var j = response[i].audios.length - 1; j >= 0 ; j--){
                    audiosHtml += '<div class="track_listen"><label style="width: 130px; padding-left: 5px;">' + (cont++) + '. ' + response[i].audios[j].title.substring(0, 12) + '...</label><span data-title="' + response[i].audios[j].title + '" data-artist="' + response[i].audios[j].title + '" data-mp3="' + response[i].audios[j].audioPlay + '" data-download="' + response[i].audios[j].audioDownload + '" title="add to playlist"><i class="fa fa-play"></i></span><a target="_blank" href="' + response[i].audios[j].audioDownload + '"><i class="fa fa-download"></i></a></div>';
                }

                categoriesHtml += audiosHtml + '</div>';

                listCategoriesHtml += '<option value="' + response[i].id + '">' + response[i].name + '</option>';
            }
            $('#categories').html(categoriesHtml);
            $('#categoriesList').html(listCategoriesHtml);

            setInitialPlayList();
        }
    });
};

function setInitialPlayList() {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/audios?ordering=-uploadDate&page=1&page_size=5',
        dataType: 'json',
        success: function (response) {
            var playListHtml = '';

            var audiosList = response.results;
            for (var i = 0; i < audiosList.length; i++) {
                playListHtml += '<li data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '"></li>';
            }

            $('#hiddenPlaylist').html(playListHtml);

            main();
        }
    });
};
