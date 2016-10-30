function initLogin() {
    isAuthenticated();
};

function isAuthenticated(){
    USER = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined;
    if (USER && USER.token){
        return true;
    }

    return false;
}

function loginSongs() {
    var username = $('#email').val();
    var password = $('#password').val();

    var data = '{"username": "' + username + '", "password": "' + password + '"}';

    POST('/api/login', data, function (response) {
        if(response.token){
            USER = response;
            localStorage.setItem("user", JSON.stringify(USER));
            var name = getUsername();
            setControlsWhenUserIsAuthenticated(name);
            initHome();
        }
        else{
            errorMessage(response);
        }
    },
    function (error) {
        errorMessage(error);
    });
}

function logoutSongs() {
    if (USER){
        var data = '{"token": "' + USER.token + '"}';

        localStorage.clear();
        USER = undefined;
        $( "#login" ).load( "login.form.html" );
        setControlsWhenUserIsNotAuthenticated();
        initHome();

        POST('/api/logout/', data, function (response) {
            if(response.success){

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
    $('#loginErrorMessage').show();
    $('#loginForm').show();
    $('#divSuccessLogin').hide();
}

function setControlsWhenUserIsAuthenticated(username){
    $('#labelUsername').html('Bienvenido ' + username);
    $('#loginErrorMessage').html('');
    $('#divSuccessLogin').show();
    $('#loginErrorMessage').hide();
    $('#loginForm').hide();
}

function setControlsWhenUserIsNotAuthenticated(){
    $('#labelUsername').html('');
    $('#loginForm').show();
    $('#loginErrorMessage').hide();
    $('#divSuccessLogin').hide();
}

function getUsername() {
    var name = '';

    if (USER.user.nickname){
        name = USER.user.nickname;
    }
    else if(USER.user.first_name && USER.user.last_name){
        name = USER.user.first_name + ' ' +  USER.user.last_name;
    }
    else if(USER.user.username){
        name = USER.user.username;
    }

    return name;
}