function initConvocationDetail() {
    $( "#alreadyAddedPlayListWarning" ).load( "alreadyAddedPlayListWarning.html" );
    setConvocationInfo();
    setAudiosConv();
};

var currentConvocation = -1
function addAudioConvocation(idConvocation) {
    setAudiosConv()
    currentConvocation = idConvocation
}

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
    GET('/api/audiosConvocation/' + idConvocation + '', function(response) {
        var audiosListHtml = '';
        var idConvoc = idConvocation;
        var idArtist = USER.user.id;
        var audiosList = response;
        console.log(response);
        for (var i=0; i < audiosList.length; i++) {
            audiosListHtml += '<li class="clearfix">'+
                '<div class="track_title">' + audiosList[i].title + '</div>'+
                '<div class="track_listen" style="display: inline-flex; width: 113px;">'+
                '<span data-title="' + audiosList[i].title + '" data-artist="' + audiosList[i].artists[0] + '" data-mp3="' + audiosList[i].audioPlay + '" data-audio-id="' + audiosList[i].id + '" title="Adicionar a la lista convocatoria"><i class="fa fa-play"></i></span><a target="_blank" title="Descargar" onclick="audioDownload(' + audiosList[i].id + ')" href="' + audiosList[i].audioDownload + '"><i class="fa fa-download"></i></a></div>'+
                '<div class="track_download_count" style="width: 122px;">' + audiosList[i].downloadsCount + '</div>' +
                '<div class="track_popularity"><a href="#" onclick="voteAudioConvocation('+idConvoc+', '+idArtist+','+audiosList[i].id+');">Votar</a></div>'+
                '<div class="track_popularity" style="width: 174px;">' + audiosList[i].votes + '</div></li>';

        }
        $('#audiosList').html(audiosListHtml);

        main();
    });
};

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

function getVotes() {

}

function associateAudioConvocation(idConvocation) {
    idAudio = $('#audiosListSelect').val();
    idConvocation = currentConvocation;
    GET('/api/convocationAudioAsociation/' + idAudio + '/' + idConvocation, function (response) {
        alert('El audio se ha asociado a la convocatoria');
        currentConvocation = -1;
        setConvocationInfo()
    });
}

function voteAudioConvocation(idConvocation, idArtist, idAudio){
    //console.log(idConvocation, idArtist);
    GET('/api/voting/' + idConvocation + '/' + idArtist + '/' + idAudio, function (response) {
        alert('Ud ah votado por este Audio');
    });
}