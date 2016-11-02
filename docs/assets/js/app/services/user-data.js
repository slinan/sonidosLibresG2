function userCreate(){
    var nickname = $('#rNickname').val();
    var birthdate = $('#rBirthdate').val();
    var genere = $('#rGenere option:selected').val();
    var description = $('#rDescription').val();


    var data = {
        username: $('#rEmail').val(),
        password: $('#rPassword').val(),
        email: $('#rEmail').val(),
        first_name: $('#rFirtsName').val(),
        last_name: $('#rLastName').val(),
        groups: [3]
    }

    POST('/api/signUp/artist', JSON.stringify(data), function (response) {
        if (response){
            login(data.username, data.password);
        }
    });

}

function loadUserData(){
    GET('/api/artists/' + USER.user.id, function (response) {
        $('#rEmail').val(response.email);
        $('#rNickname').val(response.email);
        $('#rPassword').val(response.email);
        $('#rConfirmPassword').val(response.email);
        $('#rFirtsName').val(response.email);
        $('#rLastName').val(response.email);
        $('#rBirthdate').val(response.email);
        $('#rGenere option:selected').val(response.email);
        $('#rImage').val(response.email);
        $('#rDescription').val(response.email);
    });
}

function userUpdate(){
    var email = $('#rEmail').val();
    var nickname = $('#rNickname').val();
    var password = $('#rPassword').val();
    var confirmPassword = $('#rConfirmPassword').val();
    var firtsName = $('#rFirtsName').val();
    var lastName = $('#rLastName').val();
    var birthdate = $('#rBirthdate').val();
    var genere = $('#rGenere option:selected').val();
    var image = $('#rImage').val();
    var description = $('#rDescription').val();

    var data = {
    "name": "",
    "image": "",
    "user": null
    };


    PUT('/api/artists/' + USER.user.id, data, function (response) {

    });

}