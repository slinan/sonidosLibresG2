function putConvocationPost(data, idConvocation) {
    PUT('/api/convocations/'+ idConvocation, JSON.stringify(data), function (response) {
        alert('Se ha creado la convocatoria');
        getConvocationsAgent();
        $('#convocForm').show();
        $('#convocEdit').destroy();
    });
};

function editConvocation () {
    var id          = $('#convocId').val();
    var name        = $('#convocName').val();
    var title       = $('#convocName').val();
    var dateInit    = $('#convocDateini').val();
    var dateEnd     = $('#convocDateend').val();
    var type        = $('#convocType').val();
    var status      = $('#convocStatus').val();
    var dateLimit   = $('#convocDateupl').val();
    var dateResults = $('#convocResults').val();
    var terms       = $('#convocTerms').val();
    var detail      = $('#convocDetails').val();
    convocation = {};
    convocation.id = id;
    convocation.name = name;
    convocation.title = title;
    convocation.detail = detail;
    convocation.typeConvocation = type;
    convocation.terms = terms;
    convocation.dateInit = dateInit+'T00:00:00.000000Z';
    convocation.dateEnd = dateEnd+'T00:00:00.000000Z';
    convocation.dateLimit = dateLimit+'T00:00:00.000000Z';
    convocation.dateResults = dateResults+'T00:00:00.000000Z';
    convocation.status = status;
    convocation.agent = USER.user.id;
    console.log(convocation);
    putConvocationPost(convocation, id);
}

function editConvoc(idConvocation) {
    GET('/api/convocations/'+idConvocation, function(response) {
        console.log(response);
        convocEditHtml = '';
        convocEditHtml += '<form action="javascript:;" onsubmit="editConvocation(this)" class="form-inline" novalidate="" id="convocEdit">'+
            '<div class="form-group">' +
                '<h5>Nombre Convocatoria</h5>' +
                '<input class="form-control" type="text" name="nombre" id="convocName">' +
                '<input class="form-control" type="hidden" name="id" id="convocId">' +
                '<div class="form-group">' +
                    '<h5>Tipo de Convocatoria</h5>' +
                    '<select class="form-control" id="convocType">' +
                        '<option value="PUB">Convocatoria Pública</option>' +
                        '<option value="PRI">Convocatoria Privada</option> ' +
                    '</select>' +
                '</div>' +
                '<div class="form-group">' +
                    '<h5>Subir Términos y Condiciones</h5>'+
                    '<input name="terms" type="file" class="form-control" id="convocTerms">' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '<div class="form-group">' +
                    '<h5>Fecha de Inicio</h5>' +
                    '<input name="dateini" class="form-control" type="date" id="convocDateini">' +
                '</div>' +
                '<div class="form-group">' +
                    '<h5>Fecha límite subir audios</h5>' +
                    '<input name="dateupl" class="form-control" type="date" id="convocDateupl">' +
                '</div>' +
                '<div class="form-group">' +
                    '<h5>Fecha Final</h5>' +
                    '<input name="dateend" class="form-control" type="date" id="convocDateend">' +
                '</div>' +
                '<div class="form-group">' +
                    '<h5>Fecha de Resultados</h5>' +
                    '<input name="dateresults" class="form-control" type="date" id="convocResults">' +
                '</div>' +
                '<div class="form-group">' +
                    '<h5>Estado</h5>' +
                    '<select name="status" class="form-control" id="convocStatus">' +
                        '<option value="P">Publicada</option>' +
                        '<option value="U">Sin Publicar</option>' +
                        '<option value="V">En Votación</option>' +
                        '<option value="C">Cerrada</option>' +
                    '</select>' +
                '</div>' +
                '<h5>Detalle de la convocatoria</h5>' +
                '<textarea class="form-control" id="convocDetails"></textarea>' +
                '&nbsp;' +
                '<button class="btn form-control" name="submit" type="submit">Editar</button>' +
            '</div>' +
        '</form>'

        $('#editConvocation').html(convocEditHtml);
        $('#convocForm').hide();
        $('#convocId').val(response.id);
        $('#convocName').val(response.title);
        $('#convocDateini').val(response.dateInit.substring(0,10));
        $('#convocDateend').val(response.dateEnd.substring(0,10));
        $('#convocType').val(response.typeConvocation);
        $('#convocStatus').val(response.status);
        $('#convocDateupl').val(response.dateLimit.substring(0,10));
        $('#convocResults').val(response.dateresults.substring(0,10));
        $('#convocTerms').append(response.terms);
        $('#convocDetails').append(response.detail);

    });
};