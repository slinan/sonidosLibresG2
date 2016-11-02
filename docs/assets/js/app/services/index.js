var werock = {};
var playlistScroller = {};
var globalParameters = {};


$( "#player" ).load( "player.html" );

function initHome() {
    loadPage();
    setCategories();
};

function loadPage() {
    $( "#adminMenuUsers" ).html('');
    $( "#navigationBar" ).load( "navigationBar.html" );

    $( "#footer" ).load( "footer.html" );

    $( "#loadContent" ).load( "home.html", function () {

        $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

        if(isAuthenticated()){
            $( "#login" ).load( "login.success.html", function(result) {
                var label = $(this).find('#labelUsername');
                label.html('Bienvenido, ' + getUsername());
            });

            if (isArtistUser()){
                setTopsForUser();

                $( "#audiosUpload" ).load( "upload.html", function () {
                listCategoriesForAudiosUpload();
            });
            }

            if (isAgentUser()){
                setTopsForAgent();
            }

            if (isAdminUser()){
                $( "#adminMenuUsers" ).load('admin-menu-users.html');
            }
        }
        else{
            $( "#login" ).load( "login.form.html" );
            $( '#personalitationUser' ).load('slider.html');
            setControlsWhenUserIsNotAuthenticated();
        }
    });
}

function setCategories() {
    GET('/api/categoriesTopRating/5', function (response) {
        var categoriesHtml = '';

        for (var i = 0; i < response.length; i++) {
            categoriesHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>' + response[i].name + '</h1><a class="h-right more" href="#" onclick="loader(\'category-detail\', {idCategory:' + response[i].id + '})"><span class="icon icon-more"></span>Ver más</a></header>';

            var audiosHtml = '';
            var cont = 1;
            for (var j = response[i].audios.length - 1; j >= 0 ; j--){
                var dots = '';
                if (response[i].audios[j].title.length > 24){
                    dots = '...';
                }
                audiosHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (cont++) + '. ' + response[i].audios[j].title.substring(0, 22) + dots + '</label><span data-title="' + response[i].audios[j].title + '" data-artist="' + response[i].audios[j].title + '" data-mp3="' + response[i].audios[j].audioPlay + '" data-download="' + response[i].audios[j].audioDownload + '" data-audio-id="' + response[i].audios[j].id + '" title="Adicionar a la lista de reproducción"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + response[i].audios[j].id + ')" href="' + response[i].audios[j].audioDownload + '"><i class="fa fa-download"></i></a></div>';
            }

            categoriesHtml += audiosHtml + '</div>';
        }
        $('#categories').html(categoriesHtml);

        setInitialPlayList();
    });
};

function setInitialPlayList() {
    GET('/api/audios?ordering=-uploadDate&page=1&page_size=5', function (response) {
        var playListHtml = '';

        var audiosList = response.results;
        for (var i = 0; i < audiosList.length; i++) {
            playListHtml += '<li data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" data-download="' + audiosList[i].audioDownload + '"></li>';
        }

        $('#hiddenPlaylist').html(playListHtml);

        main();
    });
};

function setFacebookLink() {
    var base = $(location).attr('href');
};

