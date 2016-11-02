function initConvocations() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    getConvocations();
    getConvocationExp();
};

function getConvocations() {
    GET('/api/convocations/', function (response) {
        convocations = response.results
        console.log(response);
        convocationsHtml = '';
        for (var i = 0; i < convocations.length; i++) {
            convocationsHtml += '<li class="clearfix">'+
                '<div style="width: 160px; word-wrap: break-word;"><a href="'+convocations[i].id+'"> '+convocations[i].title+'</a></div>'+
                '<div style="min-width: 160px;">'+convocations[i].dateInit+'</div>'+
                '<div style="min-width: 160px;">'+convocations[i].dateEnd+'</div>'+
                '<div style="min-width: 160px;">'+convocations[i].status+'</div>'+
                '<div style="min-width: 160px;">'+convocations[i].winner+'</div>'+
            '</li>'
        }
        $('#listConvocations').html(convocationsHtml);
    });
};

function getConvocationExp() {
    GET('/api/convocationExpired/', function (response) {
        convocations = response
        console.log(convocations);
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
    POST('/api/convocations/', data, function (response) {
        alert('Se ha creado la convocatoria');
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
    var terms       = $('#convocTerms').val();
    var detail      = $('#convocDetails').val();
    convocation = {};
    convocation.name = name;
    convocation.title = title;
    convocation.detail = detail;
    convocation.typeConvocation = type;
    convocation.terms = terms;
    convocation.dateInit = dateInit;
    convocation.dateEnd = dateEnd;
    convocation.dateLimit = dateLimit;
    convocation.status = status;
    convocation.agent = 3;
    console.log(convocation);
    createConvocationPost(convocation);
    //$('#modalCreateAlbum').modal('hide');

}