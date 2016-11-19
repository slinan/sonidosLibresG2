function userCreateAdmin(){
    var nickname = $('#rNickname').val();
    var birthdate = $('#rBirthdate').val();
    var genere = $('#rGenere option:selected').val();
    var description = $('#rDescription').val();
    var idGrupo = parseInt($('#rTipoUsuario option:selected').val());

    var data = {
        username: $('#rEmail').val(),
        password: $('#rPassword').val(),
        email: $('#rEmail').val(),
        first_name: $('#rFirtsName').val(),
        last_name: $('#rLastName').val()
    }

    var url = '';
    switch (idGrupo){
        case 1: url = '/api/signUp/admin';
                break;
        case 2: url = '/api/signUp/agent';
                break;
        case 3: url = '/api/signUp/artist';
                break;
    }

    POST(url, JSON.stringify(data), function (response) {
        if (response){
            $('#messageRegister').html('¡Usuario creado Exitosamente!');
        }
        else {
            $('#messageRegister').html('¡Error creando usuario!');
        }
    });
}

function vetoed(idAudio, page, pageSize) {
    PUT('/api/audios/' + idAudio, {vetoed:true}, function (response) {
        if (response){
            setAdminVetarAudiosList(page, pageSize);
        }
    });
}
