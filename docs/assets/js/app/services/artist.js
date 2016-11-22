function initArtist(){
    loadAllArtist(1, 12);
}

function loadTop7Artist() {
    GET('/api/topRandomArtists/7', function (response) {
        if (response.length > 0) {
            var birthday = new Date(response[0].birthday);
            var hoy = new Date();
            var age = parseInt((hoy -birthday)/365/24/60/60/1000);

            var gender = 'Masculino';
            if(response[0].gender == 'M'){
                gender = 'Masculino';
            }
            else if(response[0].gender == 'F'){
                gender = 'Femenino';
            }
            else{
                gender = 'LGTB';
            }

            $('#menuArtistFeaturedName').html(response[0].name);
            $('#menuArtistFeaturedName').attr('onclick', 'loader(\"artist-detail\", {idArtist:"' + response[0].id + '"})');
            $('#menuArtistFeaturedDescription').html(response[0].description);
            $('#menuArtistFeaturedImage').attr('src', response[0].image);
            $('#menuArtistFeaturedAge').html('Edad: ' + calculateAge(response[0].birthday) + ' años');
            $('#menuArtistFeaturedGender').html('Género: ' + getGender(response[0].gender));
            $('#menuArtistFeaturedDonate').attr('onclick', 'loader(\'donation\', {idArtist: ' + response[0].id + '})');

            var artistList= '';
            for(var i = 1; i < response.length; i++){
                artistList += '<li><a href="#" onclick="loader(\'artist-detail\', {idArtist:' + response[i].id + '})">' + response[i].name + '</a></li>';
            }
            artistList += '<li class="to-page"><a href="#" onclick="loader(\'artist\', {})">Ver todos</a></li>';
            $('#menuArtistList').html(artistList);
        }
    });
}

function loadAllArtist(page, pageSize) {
    GET('/api/artists?page=' + page + '&page_size=' + pageSize, function (response) {
        if (response.count > 0) {

            var artistList = '';
            for(var i = 0; i < response.results.length; i++){
                artistList += '<div class="album">'+
                      '<img src="' + response.results[i].image + '" alt="' + response.results[i].name + '"/>'+
                      '<div class="hover">'+
                          '<ul>'+
                              '<li><a href="#" data-rel="prettyPhoto" onclick="loader(\'artist-detail\', {idArtist:' + response.results[i].id + '})"><span class="fa fa-eye"  ></span></a></li>'+
                          '</ul>'+
                          '<h3>' + response.results[i].nickname + '</h3>'+
                          '<h2>' + response.results[i].name + '</h2>'+
                      '</div>'+
                  '</div>'
            }

            $('#artistList').html(artistList);

            createPagination(page, pageSize, response.count, 'loadAllArtist');
        }
    });
}
