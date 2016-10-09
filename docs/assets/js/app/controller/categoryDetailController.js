mainApp.controller('categoryDetailController', ['$scope', '$location', 'categoryService', 'audioService', function($scope, $location, categoryService, audioService) {

    $scope.category = {};

    $scope.$watch('location.search()', function() {
        var idCategory = ($location.search()).id;
        $scope.category = getCategory(idCategory);
    }, true);

    function getCategory(idCategory) {
        categoryService.getCategory(idCategory)
            .then(function (response) {
                $scope.category = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar las categoria: ' + error.message;
            });
    };
}]);