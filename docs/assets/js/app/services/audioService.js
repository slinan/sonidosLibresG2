mainApp.factory('audioService', ['$http', function($http) {

    var urlBase = 'https://sonidoslibres.herokuapp.com/api/audios';
    var audioService = {};

    audioService.getAudios = function () {
        return $http.get(urlBase);
    };

    audioService.getAudio = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    audioService.insertAudio = function (audio) {
        return $http.post(urlBase, audio);
    };

    audioService.updateAudio = function (audio) {
        return $http.put(urlBase + '/' + audio.id, audio)
    };

    audioService.deleteAudio = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    audioService.getTopAudios = function (ordering, page, pageSize) {
        return $http.delete(urlBase + '?ordering=' + ordering + '&page=' + page + '&page_size=' + pageSize);
    };

    audioService.getTopAudiosByCategory = function (idCategory, ordering, page, pageSize) {
        return $http.delete(urlBase + '?categories=' + idCategory + '&ordering=' + ordering + '&page=' + page + '&page_size=' + pageSize);
    };

    return audioService;
}]);

