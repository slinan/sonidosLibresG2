function getCommentHtml(indice, idAudio, audioName) {
    var placeHolder = 'Debes iniciar sesión para poder comentar, si no tienes cuenta puedes crear una gratis';
    var disabled = "disabled";
    var readOnly = "readonly";
    var idUser = 0;

    if (USER && USER.user){
        idUser = USER.user.id;
        readOnly = "";
        disabled = "";
        placeHolder = "";
    }

    var html = '<div id="divComment' + indice + '" style="width:100%; display: none;">' +
                    '<div class="row col-lg-12 col-md-12 col-sm-12">' +
                        '<textarea id="textComment' + indice + '" style="background: darkgray; width: 100%;" rows="3" ' + readOnly + ' >' + placeHolder + '</textarea>' +
                    '</div>' +
                    '<div class="row" style="padding-top: 20px; padding-bottom: 20px;">' +
                        '<div class="col-lg-4 col-md-4 col-sm-4">' +
                            '<button id="sendComment' + indice + '" type="submit" onclick="sendComment(' + idUser + ',' + idAudio + ', ' + indice + ')" class="btn" ' + disabled + '>Comentar</button>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-4">' +
                            '<button id="viewComments' + indice + '" type="submit" onclick="loader(\'view-comments\', {idAudio:' + idAudio + ', audioName:\'' + audioName + '\'})" class="btn" ' + disabled + '>Ver todos los comentarios</button>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-4">' +
                            '<div id="commentResponse' + indice + '"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

    return html;
}

function sendComment(idUser, idAudio, indice) {
    var data = {
        user: idUser,
        audio: idAudio,
        commentary: $('#textComment' + indice).val()
    };

    POST('/api/commentaries', data, function (response) {
        $('#commentResponse' + indice).html('¡Tú comentario fue enviado satisfactoriamente!');
    });
}

function showCommentArea(indice) {
    $('#commentResponse' + indice).html('');

    if( $('#divComment' + indice).is(":visible") ){
        $('#divComment' + indice).hide();
    }else{
        $('#divComment' + indice).show();
    }
}

function closeComment(indice) {
    $('#divComment' + indice).hide();
}
