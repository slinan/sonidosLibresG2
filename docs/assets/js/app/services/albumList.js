function initAlbums() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );

    getAlbums();
};

function getAlbums() {
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/albums/',
        dataType: 'json',
        success: function (response) {
            albums = response.results
            albumsHtml = '';

            for (var i = 0; i < albums.length; i++) {
                albumsHtml += '                  <div class="album">'+
                      '<img src="'+albums[i].image+'" alt=""/>'+
                      '<div class="hover">'+
                          '<ul>'+
                              '<li><a href="#" data-rel="prettyPhoto" onclick="loader(\'album-detail\', {idAlbum:' + albums[i].id + '})"><span class="fa fa-eye"  ></span></a></li>'+
                              '<li><a href="#" onclick="addAudioAlbum('+albums[i].id+')"><span class="fa fa-plus-circle" ></span></a></li>'+
                          '</ul>'+
                          '<h3>'+albums[i].rating+'</h3>'+
                          '<h2>'+albums[i].title+'</h2>'+
                      '</div>'+
                  '</div>'
            }

            $('#lastAlbums').html(albumsHtml);
        }
    });
};

function createAlbumPost(data) {
    $.ajax({
        type: 'POST',
        url: 'https://sonidoslibres.herokuapp.com/api/albums/',
        dataType: 'json',
        data: data,
        success: function (response) {
            alert('El álbum ha sido creado');
        }
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
        $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/audios/',
        dataType: 'json',
        success: function (response) {
            items = response.results

            $.each(items, function (i, item) {
            $('#audiosList').append($('<option>', {
            value: item.id,
            text: item.title
        }));
    });
        }
    });
}

function associateAudioAlbum () {

    idAudio = $('#audiosList').val();
    idAlbum = currentAlbum

            $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/albumAudio/'+idAudio+'/'+idAlbum,
        dataType: 'json',
        success: function (response) {
            alert('El audio se ha asociado al álbum')
            currentAlbum = -1
            $('#audioAlbumsModal').modal('hide');
        }
    });
}


