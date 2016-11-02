function initConvocations() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    getConvocations();
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

/*function getSoonConvocations() {
    GET('/api/convocations/', function (response) {
        convocations = response.results
        soonEndHtml = '';
        for (var i = 0; i < convocations.length; i++) {
            convocatoriesHtml += '<div class="event-feed">'+
			    '<div class="date">'+convocations[i].dateEnd+'<span class="day">24</span> <span class="month">AUG</span> </div>'+
				'<h5><a href="">'+convocations[i].title+'</a></h5>'+
				'<p>'convocation[i].details+'</p>'+
			'</div>'
        }
        $('#soonEndConvocation').html(soonEndHtml);
    });
};*/

function createConvocationPost(data) {
    POST('/api/convocations/', data, function (response) {
        alert('Se ha creado la convocatoria');
        getConvocations();
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
    convocation.dateInit = dateInit;
    convocation.dateEnd = dateEnd;
    convocation.type = type;
    convocation.status = status;
    convocation.dateLimit = dateLimit;
    convocation.terms = terms;
    convocation.detail = detail;
    convocation.agent = 3;
    console.log(convocation);
    createConvocationPost(convocation);
    //$('#modalCreateAlbum').modal('hide');

}