function setPopularity(idEscale, rating, numOfRatings) {
    $('#escale' + idEscale ).html(getPopularity(rating));

    rating = rating + '';
    rating = rating.slice(0, (rating.indexOf('.'))+2);
    rating = parseFloat(rating);

    $('#escale' + idEscale ).attr('title', rating + ' de ' + numOfRatings + ' votos');
}

function getPopularity(rating) {
    var rate = (Math.floor(rating) * 2);
    return getPositiveRating(rate) + getNegativeRating(rate);
}

function getPositiveRating(rating) {
    var positiveRating = '';
    for (var j = 0; j < rating; j++){
        positiveRating += '<li class="active"></li>';
    }

    return positiveRating;
}

function getNegativeRating(rating) {
    var negativeRating = '';
    for (var j = 0; j < 10 - rating; j++){
        negativeRating += '<li></li>';
    }

    return negativeRating;
}

function getStarsList(idAudio, indice) {
    var list = '<button href="#" data-value="1" title="Votar con 1 estrellas" onclick="rateAudio(' + idAudio + ',' + indice + ', 1)">&#9733;</button>' +
            '<button href="#" data-value="2" title="Votar con 2 estrellas" onclick="rateAudio(' + idAudio + ',' + indice + ', 2)">&#9733;</button>' +
            '<button href="#" data-value="3" title="Votar con 3 estrellas" onclick="rateAudio(' + idAudio + ',' + indice + ', 3)">&#9733;</button>' +
            '<button href="#" data-value="4" title="Votar con 4 estrellas" onclick="rateAudio(' + idAudio + ',' + indice + ', 4)">&#9733;</button>' +
            '<button href="#" data-value="5" title="Votar con 5 estrellas" onclick="rateAudio(' + idAudio + ',' + indice + ', 5)">&#9733;</button>';

    var rates = localStorage.getItem('rates');
    if (rates){
        rates = JSON.parse(rates);
        var exist = rates[idAudio];
        if (exist && exist == 1){
            list = '';
        }
    }

    return list;
}

function mostrarEstrellas(elementId) {
    $('#estrellas' + elementId).show();
}

function ocultarEstrellas(elementId) {
    $('#estrellas' + elementId).hide();
}

function removeEstrellas(elementId) {
    $('#estrellas' + elementId).html('');
}

function rateAudio(idAudio, elementId, rate) {
    GET('/api/rateAudio/' + idAudio + '/' + rate, function (response) {
        setRatesLocalStorage(idAudio);

        ocultarEstrellas(elementId);
        removeEstrellas(elementId);
        setPopularity(elementId, response.rating, response.numOfRatings);
    });
}

function setRatesLocalStorage(idAudio) {
    var rates = localStorage.getItem('rates');
    if (rates){
        rates = JSON.parse(rates);
        rates[idAudio] = 1;
    }
    else{
        rates = new Array();
        rates[idAudio] = 1;
    }
    localStorage.setItem('rates', JSON.stringify(rates));

    return rates;
}

function getRatesLocalStorage() {
    var rates = localStorage.getItem('rates');
    if (rates){
        rates = JSON.parse(rates);
    }

    return rates;
}
