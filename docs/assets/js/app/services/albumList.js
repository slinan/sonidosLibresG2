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
                              '<li><a href="#" data-rel="prettyPhoto" onclick="loader(\'album-detail\', {idAlbum:' + albums[i].id + '})"><span class="fa fa-plus-circle"  ></span></a></li>'+
                              '<li><a href="category-detail.html"><span class="fa fa-link"></span></a></li>'+
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