function initDonation() {
    $('#donateform').show();
    $('#donateResponse').hide();
    $('#breadcrumbArtist').attr('onclick', 'loader(\'artist-detail\', {idArtist:' + globalParameters.idArtist + '})');
    getArtistDetail();
}

function getArtistDetail() {
    GET('/api/artists/' + globalParameters.idArtist, function(response) {
        $('#artistName').val(response.name);
    });
};

function donate() {
    var data = {
        idUser: USER.user.id,
        idArtist: globalParameters.idArtist,
        amount: parseInt($('#amount').val()),
        franchise: $('#franchise option:selected').val(),
        creditCard: $('#creditCard').val(),
        creditCardExpirationDate: $('#creditCardExpirationDate').val(),
        creditCardOwnerName: $('#creditCardOwnerName').val()
    }

    POST('/api/donations', data, function (response) {
        $('#donateform').hide();
        $('#donateResponse').show();

        $('#resCodRef').html(Math.floor((Math.random() * 1000000) + 1));
        $('#resArtistName').html($('#artistName').html());
        $('#resAmount').html('$' + $('#amount').val());
    });
}