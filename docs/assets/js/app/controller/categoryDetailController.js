mainApp.controller('categoryDetailController', ['$scope', '$location', 'categoryService', 'audioService', function($scope, $location, categoryService, audioService) {

    $scope.category = {};
    $scope.audios = [];
    $scope.relatedCategories = [];
    $scope.getAudios = getAudios;
    $scope.getNumberInactiveRating = getNumberInactiveRating;

    $scope.$watch('location.search()', function() {
        var idCategory = ($location.search()).id;
        getCategory(idCategory);
        getAudios(idCategory, 1, 20);
        getRelatedCategories(idCategory);
    }, true);

    function getCategory(idCategory) {
        categoryService.getCategory(idCategory)
            .then(function (response) {
                $scope.category = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar las categoria: ' + error.message;
            });
    };
    
    function getAudios(idCategory, page, pageSize) {
        audioService.getAudiosByCategory(idCategory, page, pageSize)
            .then(function (response) {
                $scope.audios = response.data.results;
            }, function (error) {
                $scope.status = 'No es posible cargar las categoria: ' + error.message;
            });
    };

    $scope.getNumberActiveRating = function(num) {
        var intvalue = (Math.floor(num) * 2);
        var array = [];
        for (var i = 0; i < intvalue; i++){
            array.push(i);
        }
        return array;
    };

    function getNumberInactiveRating(num) {
        var intvalue = (Math.floor(num) * 2);
        var array = [];
        for (var i = 0; i < 10 - intvalue; i++){
            array.push(i);
        }
        return array;
    };

    function getRelatedCategories(idCategory){
        categoryService.getRelatedCategories(idCategory)
            .then(function (response) {
                for (var i = 0; i < 5; i++){
                    $scope.relatedCategories.push(response.data.results[i]);
                }
            }, function (error) {
                $scope.status = 'No es posible cargar las categoria: ' + error.message;
            });
    }
}]);