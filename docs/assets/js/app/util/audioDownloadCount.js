function audioDownload(idAudio)
{
    $.ajax({
        type: 'GET',
        url: 'https://sonidoslibres.herokuapp.com/api/download/' + idAudio,
        dataType: 'json',
        success: function (response) {
        }
    });
}
