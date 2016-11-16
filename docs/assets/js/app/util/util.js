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
    if (!functionParameters){
        functionParameters = '';
    }
    else if (!functionParameters.endsWith(",")){
        functionParameters += ', ';
    }

    var pagination = '<ul>' +
        '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page - 1 <= 0) ? 1 : (page - 1) ) + ', ' + pageSize + ')"><b class="fa fa-angle-left"></b></a></li>';

    var finalPage = '';
    var startPage = 1;
    var numPages = totalElements / pageSize;
    if (numPages <= 0){
        numPages = 1;
    }
    else if (numPages > 5){
        finalPage = '<li><a href="#">...</a></li>' +
                '<li><a href="#" onclick="' + functionName + '(' + functionParameters + numPages + ', ' + pageSize + ')">' + numPages + '</a></li>';

        numPages = 5;
        startPage = page;
    }
    for (var i = startPage; i < startPage + numPages; i++) {
        pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + i + ', ' + pageSize + ')">' + i + '</a></li>';
    }

    pagination += finalPage;
    pagination += '<li><a href="#" onclick="' + functionName + '(' + functionParameters + ((page + 1 > totalElements / pageSize) ? page : page + 1) + ', ' + pageSize + ')"><b class="fa fa-angle-right"></b></a></li>' +
            '</ul>';

    $('#pagination').html(pagination);
};