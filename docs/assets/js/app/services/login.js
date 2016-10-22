function initLogin() {

};

function login(username, password) {
    var data = '{"username":"' + username + '", "password":"' + password + '"}';

    POST('/api/login/', data, function (response) {
        if(response.isAuthenticated){
            localStorage.setItem("user", response);
            var name = username;
            if (response.nickname){
                name = response.nickname;
            }
            else if(response.firtsName && response.lastName){
                name = response.firtsName + ' ' +  response.lastName;
            }

            $('#labelUsername').html('Bienvenido ' + name);
            $('#loginErrorMessage').html('');
            $('#divSuccessLogin').css('display', 'block');
            $('#loginErrorMessage').css('display', 'none');
            $('#divUserLoginForm').css('display', 'none');

            initHome();
        }
        else{
            errorMessage(response.error);
        }
    },
    function (error) {
        errorMessage(error);
    });
}

function logout() {
    var user = localStorage.getItem("user");
    if (user){
        var data = '{"token": "' + user.token + '"}';

        POST('/api/logout/', data, function (response) {
            if(response.success){
                $('#labelUsername').html('');
                $('#divUserLoginForm').css('display', 'block');
                $('#loginErrorMessage').css('display', 'none');
                $('#divSuccessLogin').css('display', 'none');

                localStorage.clear();
                initHome();
            }
            else{
                errorMessage(response.error);
            }
        },
        function (error) {
            errorMessage(error);
        });
    }
}

function errorMessage(error) {
    $('#loginErrorMessage').html(error);
    $('#labelUsername').html('');
    $('#loginErrorMessage').css('display', 'block');
    $('#divUserLoginForm').css('display', 'block');
    $('#divSuccessLogin').css('display', 'none');
}