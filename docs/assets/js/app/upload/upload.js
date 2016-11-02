function uploadFile() {
    var dbx = new Dropbox({ accessToken: "tryNhyybB9AAAAAAAAAAH-_BZJ4dmbWicj6V0dmLfAWjhtRiOWhT89niu1BZHtHb" });
    var fileInput = document.getElementById('file-upload');
    var file = fileInput.files[0];
    var title = file.name.substring(0, file.name.lastIndexOf("."));
    var name = MD5(file.name);

    dbx.filesUpload({path: '/songs/' + name +'.mp3', contents: file})
        .then(function(response) {
            var supload = response;
            if (supload != null){
                dbx.sharingCreateSharedLink({path: '/songs/' + MD5(file.name)+'.mp3'})
                    .then(function(response){
                        var link = response.url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
                        link = link.replace("?dl=0", "");

                        var idCategory = parseInt($('#categoriesList option:selected').val());

                        var audio = {
                            name: name,
                            title: title,
                            audioDownload: link,
                            audioPlay: link,
                            categories:[idCategory],
                            artists: [USER.user.id],
                            albums:[1]
                        };

                        POST('/api/audios', JSON.stringify(audio), function (res) {
                            $('#results').html('Audio [' + title + '] Cargado!');
                        },
                        function (err) {
                            $('#results').html('' + err);
                        });
                    });
            }
        })
        .catch(function(error) {
        });

    return true;
}