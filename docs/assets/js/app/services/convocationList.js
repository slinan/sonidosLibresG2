function initConvocations() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    getConvocations();
    getConvocationExp();
};

function initConvocationsAgent() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    getConvocationsAgent();
};

function getConvocations() {
    GET('/api/convocations/', function (response) {
        convocations = response.results
        convocationsHtml = '';
        for (var i = 0; i < convocations.length; i++) {
            var winner = (convocations[i].winner == null)? "Evaluando": convocations[i].winner;
            convocationsHtml += '<li class="clearfix">'+
                '<div style="width: 160px; word-wrap: break-word;"><a href="#" onclick="loader(\'convocation-detail\', {idConvocation:' + convocations[i].id + '})"> '+convocations[i].title+'</a></div>'+
                '<div style="min-width: 160px;">'+setListsDate(convocations[i].dateInit)+'</div>'+
                '<div style="min-width: 160px;">'+setListsDate(convocations[i].dateEnd)+'</div>'+
                '<div style="min-width: 160px;">'+setConvocStatus(convocations[i].status)+'</div>'+
                '<div style="min-width: 160px;">'+winner+'</div>'+
            '</li>'
        }
        $('#listConvocations').html(convocationsHtml);
    });
};

function getConvocationsAgent() {
    GET('/api/convocations/', function (response) {
        convocations = response.results
        convocationsHtml = '';
        for (var i = 0; i < convocations.length; i++) {

           var winner = (convocations[i].winner == null)? "Evaluando": convocations[i].winner;
            convocationsHtml += '<li class="clearfix">'+
                '<div style="width: 160px; word-wrap: break-word;"><a href="#" onclick="editConvoc('+ convocations[i].id +')"> '+convocations[i].title+'</a></div>'+
                '<div style="min-width: 160px;">'+setListsDate(convocations[i].dateInit)+'</div>'+
                '<div style="min-width: 160px;">'+setListsDate(convocations[i].dateEnd)+'</div>'+
                '<div style="min-width: 160px;">'+setConvocStatus(convocations[i].status)+'</div>'+
                '<div style="min-width: 160px;">'+winner+'</div>'+
            '</li>'
        }
        $('#listConvocations').html(convocationsHtml);
    });
};

function getConvocationExp() {
    GET('/api/convocationExpired/', function (response) {
        convocations = response
        soonEndHtml = '';
        for (var i = 0; i < convocations.length; i++) {
            soonEndHtml += '<div class="event-feed">'+
			    '<div class="date"><span class="day">'+convocations[i].dateEnd.substring(8,10)+'</span><span class="month">'+convocations[i].dateEnd.substring(5,7)+'</span></div>'+
				'<h5><a href="">'+convocations[i].title+'</a></h5>'+
				'<p>'+convocations[i].detail+'</p>'+
			'</div>'
        }
        $('#soonEndConvocation').html(soonEndHtml);
    });
};

function createConvocationPost(data) {
    POST('/api/convocations/', JSON.stringify(data), function (response) {
        alert('Se ha creado la convocatoria');
        getConvocationsAgent();
        $('#convocForm').trigger("reset");
    });
};

function createConvocation () {
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
    convocation.agent = 7;
    console.log(convocation);
    createConvocationPost(convocation);
}

function setConvocStatus(convocType){
    var typeC;
    switch (convocType){
        case "P" : typeC = "Publicada"
            break;
        case "U" : typeC = "Sin Publicar"
            break;
        case "V" : typeC = "En Votaión"
            break;
        case "C" : typeC = "Cerrada"
            break;
        case "R" : typeC = "Retirada"
            break;
        case "PUB" : typeC = "Convocatoria Pública"
            break;
        case "PRI" : typeC = "Convocatoria Privada"
            break;
    }
    return typeC;
}

function setListsDate(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};