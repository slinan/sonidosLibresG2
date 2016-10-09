mainApp.controller("audioController", ['$scope', 'audioService', function ($scope, audioService) {

    getPlayListAudios();

    $scope.top5ByCategory = [];
    $scope.status = "";
    $scope.getAudios = getAudios;
    $scope.getPlayListAudios = getPlayListAudios;

    function getAudios(){
        audioService.getAudios()
            .then(function (response) {
                $scope.audios = response.data.results;
            }, function (error) {
                $scope.status = 'No es posible cargar los audios: ' + error.message;
            });
    };

    function getPlayListAudios() {
        audioService.getTopAudios('-uploadDate', 1, 5)
            .then(function (response) {
                $scope.playListAudios = response.data.results;
            }, function (error) {
                $scope.status = 'No es posible cargar los audios: ' + error.message;
            });
    };
}]);

mainApp.directive('myList', function() {
    return {
        template: '<ul class="hidden playlist-files"><li ng-repeat="audio in playListAudios" data-title="{{audio.title}}" data-artist="{{audio.artists[0]}}" data-mp3="{{audio.audioPlay}}"></li></ul>'
    };
});



