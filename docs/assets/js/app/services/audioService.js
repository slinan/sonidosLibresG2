mainApp.factory('audioService', ['$http', function($http) {

    var urlBase = 'https://sonidoslibres.herokuapp.com/api';
    var urlAudio = '/audios';
    var urlTopCategroies = '/categoriesTopRating/';
    var audioService = {};

    audioService.getAudios = function () {
        return $http.get(urlBase + urlAudio + '/');
    };

    audioService.getAudio = function (id) {
        return $http.get(urlBase + urlAudio + '/' + id);
    };

    audioService.insertAudio = function (audio) {
        return $http.post(urlBase, audio);
    };

    audioService.updateAudio = function (audio) {
        return $http.put(urlBase + urlAudio + '/' + audio.id, audio)
    };

    audioService.deleteAudio = function (id) {
        return $http.delete(urlBase + urlAudio + '/' + id);
    };

    audioService.getTopAudios = function (ordering, page, pageSize) {
        return $http.get(urlBase + urlAudio + '?ordering=' + ordering + '&page=' + page + '&page_size=' + pageSize);
    };

    audioService.getCategoriesWithTop = function (size) {
        return $http.get(urlBase + urlTopCategroies + size);
    };

    return audioService;
}]);

