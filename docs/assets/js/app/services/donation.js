function initDonation() {
    $('#donateform').show();
    $('#donateResponse').hide();
    getArtistDetail();
}

function getArtistDetail() {
    GET('/api/artists/' + globalParameters.idArtist, function(response) {
        $('#artistName').html(response.name);        
    });
};

function donate() {
    var data = {
        idUser: USER.user.id,
        idArtist: $('#idArtist').val(),
        amount: $('#amount').val(),
        franchise: $('#franchise option:selected').val(),
        creditCard: $('#creditCard').val(),
        creditCardExpirationDate: $('#creditCardExpirationDate').val(),
        creditCardOwnerName: $('#creditCardOwnerName').val()
    }

    POST('/api/donate', data, function (response) {
        $('#donateform').hide();
        $('#donateResponse').show();

        $('#resCodRef').html(Math.floor((Math.random() * 1000000) + 1));
        $('#resArtistName').html($('#artistName').html());
        $('#resAmount').html('$' + $('#amount').val());
    });
}