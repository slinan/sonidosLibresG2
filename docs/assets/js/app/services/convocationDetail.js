function initConvocationDetail() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    setConvocationInfo();
    setAudiosConv();
};




function setConvocationInfo() {
    var idConvocation = globalParameters.idConvocation;
    GET('/api/convocations/'+idConvocation, function(response) {
        $('#convocName').append(response.title);
        $('#convocDateini').html(response.dateInit);
        $('#convocDateend').html(response.dateEnd);
        $('#convocType').html(response.typeConvocation);
        $('#convocStatus').html(response.status);
        $('#convocDateupl').html(response.dateLimit);
        $('#convocResults').html(response.dateresults);
        $('#convocTerms').html(response.terms);
        $('#convocDetails').html(response.detail);

        setConvocationAudiosList(idConvocation);
    });
};

function setConvocationAudiosList(idConvocation) {
    addAudioConvocation(idConvocation);
    GET('/api/convocationAudios/' + idConvocation + '', function(response) {
        var audiosListHtml = '';

        var audiosList = response;
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix">'+
                '<div class="track_title">' + audiosList[i].title + '</div>'+
                '<div class="track_listen" style="display: inline-flex;">'+
                '<span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" title="Adicionar a la lista convocatoria"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + audiosList[i].id + ')" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div><div class="track_download_count">' + audiosList[i].downloadsCount + '</div><div class="track_plays_count">' + audiosList[i].playCount + '</div><div class="track_popularity"><ul title="' + audiosList[i].rating + ' de ' + audiosList[i].numOfRatings + ' votos">';

            var rating = (Math.floor(audiosList[i].rating) * 2);
            audiosListHtml += getPositiveRating(rating) + getNegativeRating(rating);

            audiosListHtml += '</ul></div><div class="track_buy"><a data-target="#modal3" data-toggle="modal" id="comment" href="#modal3"><i class="fa fa-pencil-square-o"></i></a></div></li>';
        }
        $('#audiosList').html(audiosListHtml);

        main();
    });
};

var currentConvocation = -1
function addAudioConvocation(idConvocation) {
    setAudiosConv()
    currentConvocation = idConvocation
}

function setAudiosConv() {
    GET('/api/audios/', function (response) {
        items = response.results
        $.each(items, function (i, item) {
            $('#audiosListSelect').append($('<option>', {
                value: item.id,
                text: item.title
            }));
        });
    });
}

function associateAudioConvocation(idConvocation) {
    idAudio = $('#audiosListSelect').val();
    idConvocation = currentConvocation;
    GET('/api/convocationAudio/' + idAudio + '/' + idConvocation, function (response) {
        alert('El audio se ha asociado a la convocatoria');
        currentConvocation = -1;
        //$('#audioAlbumsModal').modal('hide');
        setConvocationInfo()
    });
}