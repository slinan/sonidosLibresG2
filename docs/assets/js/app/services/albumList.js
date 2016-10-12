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
                      '<img src="assets/img/albums/1.jpg" alt=""/>'+
                      '<div class="hover">'+
                          '<ul>'+
                              '<li><a href="'+albums[i].image+'" data-rel="prettyPhoto"><span class="fa fa-plus-circle"  ></span></a></li>'+
                              '<li><a href="category-detail.html"><span class="fa fa-link"></span></a></li>'+
                          '</ul>'+
                          '<h3>Lorem Artist</h3>'+
                          '<h2>Album</h2>'+
                      '</div>'+
                  '</div>'
            }

            $('#lastAlbums').html(albumsHtml);
        }
    });
};