function initAlbums() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

    getAlbums();
};

function getAlbums() {
    GET('/api/albums/', function (response) {
        albums = response.results
        albumsHtml = '';

        for (var i = 0; i < albums.length; i++) {
            albumsHtml += '<div class="album">'+
                  '<img src="'+albums[i].image+'" alt=""/>'+
                  '<div class="hover">'+
                      '<ul>'+
                          '<li><a href="#" data-rel="prettyPhoto" onclick="loader(\'album-detail\', {idAlbum:' + albums[i].id + '})"><span class="fa fa-eye"  ></span></a></li>'+
                          '<li><a href="#" onclick="addAudioAlbum('+albums[i].id+')"><span class="fa fa-plus-circle" ></span></a></li>'+
                      '</ul>'+
                      '<h3>'+albums[i].rating+'</h3>'+
                      '<h2>'+albums[i].title+'</h2>'+
                  '</div>'+
              '</div>';
        }

        $('#lastAlbums').html(albumsHtml);
    });
};

function getMenuTop8Albums() {
    GET('/api/topAlbums', function (response) {
        albums = response;
        albumsHtml = '';

        for (var i = 0; i < albums.length; i++) {
            albumsHtml += '<a href="#" onclick="loader(\'album-detail\', {idAlbum:' + albums[i].id + '})">' +
                            '<img src="' + albums[i].image + '" alt="' + albums[i].title + '">' +
                          '</a>';
        }

        $('#menuArtistTopAlbums').html(albumsHtml);
    });
};

function createAlbumPost(data) {
    POST('/api/albums/', data, function (response) {
        alert('El álbum ha sido creado');
    });
};


function createAlbum () {
    var title= $('#albumTitleForm').val();
    var image= $('#albumImageForm').val();
    var categories= $('#albumCategoriesForm').val();
    album = {};
    album.title = title;
    album.image = image;
    album.categories = categories;
    console.log(album)
    createAlbumPost(album)
    $('#modalCreateAlbum').modal('hide');

}
var currentAlbum = -1
function addAudioAlbum(idAlbum) {
    setAudios()
    $('#audioAlbumsModal').modal('show');
    currentAlbum = idAlbum
}

function setAudios() {
    GET('/api/audios/', function (response) {
        items = response.results

        $.each(items, function (i, item) {
            $('#audiosList').append($('<option>', {
                value: item.id,
                text: item.title
            }));
        });
    });
}

function associateAudioAlbum () {
    idAudio = $('#audiosList').val();
    idAlbum = currentAlbum;

    GET('/api/albumAudio/' + idAudio + '/' + idAlbum, function (response) {
        alert('El audio se ha asociado al álbum');
        currentAlbum = -1;
        $('#audioAlbumsModal').modal('hide');
    });
}


