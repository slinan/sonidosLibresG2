mainApp.controller("audioController", ['$scope', 'audioService', function ($scope, audioService) {

    $scope.getAudios = function (){
        audioService.getAudios()
            .then(function (response) {
                $scope.audios = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar los audios: ' + error.message;
            });
    };

    $scope.getPlayListAudios = function () {
        audioService.getTopAudios('uploadDate', 1, 5)
            .then(function (response) {
                $scope.playListAudios = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar los audios: ' + error.message;
            });
    };

    $scope.getTop5ByCategory = function (idCategory){
        audioService.getTopAudiosByCategory(idCategory, 'rating', 1, 5)
            .then(function (response) {
                $scope.top5ByCategory = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar los audios: ' + error.message;
            });
    };
}]);

mainApp.directive('myList', function() {
    return {
        template: '<ul class="hidden playlist-files"><li ng-repeat="audio in getPlayListAudios()" data-title="{{audio.title}}" data-artist="{{audio.artists[0]}}" data-mp3="{{audio.audioPlay}}"></li></ul>'
    };
});



