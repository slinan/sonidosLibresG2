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
        var idConvoc = idConvocation;
        var idArtist = 10;
        var audiosList = response;
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix">'+
                '<div class="track_title">' + audiosList[i].title + '</div>'+
                '<div class="track_listen" style="display: inline-flex; width: 113px;">'+
                '<span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" title="Adicionar a la lista convocatoria"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + audiosList[i].id + ')" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div>'+
                '<div class="track_download_count" style="width: 122px;">' + audiosList[i].downloadsCount + '</div>' +
                '<div class="track_popularity"><a href="#" onclick="voteAudioConvocation('+idConvoc+', '+idArtist+');">Votar</a></div>'+
                '<div class="track_popularity" style="width: 174px;">20</div></li>';

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

function voteAudioConvocation(idConvocation, idArtist){
    //console.log(idConvocation, idArtist);
    GET('/api/voting/' + idConvocation + '/' + idArtist, function (response) {
        alert('UD ah votado por este Audio');
    });
}