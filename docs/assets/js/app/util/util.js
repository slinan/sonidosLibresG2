function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function createPagination(page, pageSize, totalElements, functionName, functionParameters) {
    var maxPage = 10;
    if (!functionParameters){
        functionParameters = '';
    }
    else if (!functionParameters.endsWith(",")){
        functionParameters += ', ';
    }

    if (page < maxPage){
        page = 1;
    }

    var pagination = '<ul>' +
        '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page - 1 <= 0) ? 1 : (page - 1) ) + ', ' + pageSize + ')"><b class="fa fa-angle-left"></b></a></li>';

    var finalPage = '';
    var startPage = 1;
    var rawNumPage = totalElements / pageSize;
    var numPages = rawNumPage > Math.round(rawNumPage) ? Math.round(rawNumPage) + 1 : Math.round(rawNumPage);

    if (numPages <= 0){
        numPages = 1;
    }
    else if (numPages > maxPage){
        finalPage = '<li><a href="#">...</a></li>' +
                '<li><a href="#" onclick="' + functionName + '(' + functionParameters + numPages + ', ' + pageSize + ')">' + numPages + '</a></li>';

        numPages = maxPage;
        startPage = page;
    }

    for (var i = startPage; i < startPage + numPages; i++) {
        pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + i + ', ' + pageSize + ')">' + i + '</a></li>';
    }

    pagination += finalPage;
    pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page + 1 > numPages) ? page : page + 1) + ', ' + pageSize + ')"><b class="fa fa-angle-right"></b></a></li>' +
            '</ul>';

    $('#paginationUp').html(pagination);
    $('#paginationBottom').html(pagination);
};