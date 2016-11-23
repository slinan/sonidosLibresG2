function initViewComments() {
    getCommentsAudio(1, 10);
}

function getCommentsAudio(page, pageSize) {
    var idAudio = globalParameters.idAudio;
    $('#cAudio').html(globalParameters.audioName);
    $('#cTotalComments').html('0');

    GET('/api/commentaries?audio=' + idAudio + '&page=' + page + '&page_size=' + pageSize, function (response) {
        $('#cTotalComments').html(response.count);

        var commentsListHtml = '<li class="track-head clearfix">' +
                                 '<div class="track_time">No</div>' +
                                 '<div class="track_comments_list">Comentarios</div>' +
                                 '<div class="track_title">Fecha</div>' +
                             '</li>';

        for (var i=0; i < response.results.length; i++) {
            commentsListHtml += '<li class="clearfix">' +
                '<div class="track_time">' + (i + 1 + (page * 10) - 10) + '</div>' +
                '<div class="track_comments_list">' + response.results[i].commentary + '</div>' +
                '<div class="track_title">' + response.results[i].date + '</div>' +
                '</li>';
        }

        $('#commentsList').html(commentsListHtml);

        createPagination(page, pageSize, response.count, 'getCommentsAudio');
    });
}