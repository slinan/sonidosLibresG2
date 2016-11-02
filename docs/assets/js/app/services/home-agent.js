function setTopsForAgent() {
    getTopMeConvocatoriesAgentLimitSendAudios();
};

function getTopMeConvocatoriesAgentLimitSendAudios() {
    GET('/api/convocations?page=1&page_size=5', function (response) {
        var topsHtml = '';
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis convocatorias próximas a vencer el plazo de envío de audios</h1></header>';

        var convocationsHtml = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            convocationsHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><label> - Fecha Vencimiento: ' + response.results[i].dateEnd + '</label></div>';
        }
        topsHtml += convocationsHtml + '</div>';

        getTopMeConvocatoriesAgentComingSoonOvercome(topsHtml);

    });
}

function getTopMeConvocatoriesAgentComingSoonOvercome(topsHtml) {
    GET('/api/convocations?page=1&page_size=5', function (response) {
        topsHtml += '<div class="album" ><header><h1><span class="icon icon-top"></span>Mis convocatorias próximas a vencer</h1></header>';

        var convocationsHtml = '';
        for (var i = 0; i < response.results.length ; i++){
            var dots = '';
            if (response.results[i].title.length > 24){
                dots = '...';
            }
            convocationsHtml += '<div class="track_listen"><label style="width: 200px; padding-left: 5px;">' + (i + 1) + '. ' + response.results[i].title.substring(0, 22) + dots + '</label><label> - Fecha Vencimiento: ' + response.results[i].dateEnd + '</label></div>';
        }
        topsHtml += convocationsHtml + '</div>';

        $('#personalitationUser').html(topsHtml);
        setInitialPlayList();
    });
}