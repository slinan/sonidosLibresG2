function uploadFile() {
      var dbx = new Dropbox({ accessToken: "tryNhyybB9AAAAAAAAAAH-_BZJ4dmbWicj6V0dmLfAWjhtRiOWhT89niu1BZHtHb" });
      var fileInput = document.getElementById('file-upload');
      var file = fileInput.files[0];
      dbx.filesUpload({path: '/songs/' + MD5(file.name)+'.mp3', contents: file})
        .then(function(response) {
          var results = document.getElementById('results');
          results.appendChild(document.createTextNode('Archivo Cargado!'));
		  var supload = response;
          console.log(supload);
		  if (supload != null){
			dbx.sharingCreateSharedLink({path: '/songs/' + MD5(file.name)+'.mp3'})
			.then(function(response){console.log(response);});
		  }
        })
        .catch(function(error) {
          console.error(error);
        });
	  return false;
    }