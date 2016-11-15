function userCreate(){
    var data = {
        username: $('#rEmail').val(),
        password: $('#rPassword').val(),
        email: $('#rEmail').val(),
        first_name: $('#rFirtsName').val(),
        last_name: $('#rLastName').val(),
        image: $('#rImage').val(),
        nickname: $('#rNickname').val(),
        birthday: $('#rBirthdate').val(),
        gender: $('#rGenere option:selected').val(),
        description: $('#rDescription').val(),
        groups: [3]
    };

    POST('/api/signUp/artist', JSON.stringify(data), function (response) {
        if (response){
            login(data.username, data.password);
        }
    });
}

function loadUserData(){
    GET('/api/artists/' + USER.user.id, function (response) {
        $('#rEmail').val(response.email);
        $('#rNickname').val(response.nickname);
        $('#rPassword').val(response.password);
        $('#rConfirmPassword').val(response.email);
        $('#rFirtsName').val(response.first_name);
        $('#rLastName').val(response.last_name);
        $('#rBirthdate').val(response.birthday);
        $('#rGenere option:selected').val(response.gender);
        $('#rImage').val(response.image);
        $('#rDescription').val(response.description);
    });
}

function userUpdate(){
    var data = {
        username: $('#rEmail').val(),
        password: $('#rPassword').val(),
        email: $('#rEmail').val(),
        first_name: $('#rFirtsName').val(),
        last_name: $('#rLastName').val(),
        image: $('#rImage').val(),
        nickname: $('#rNickname').val(),
        birthday: $('#rBirthdate').val(),
        gender: $('#rGenere option:selected').val(),
        description: $('#rDescription').val(),
        groups: [3]
    }

    PUT('/api/artists/' + USER.user.id, data, function (response) {

    });
}