mainApp.controller('categoryHomeController', ['$scope', 'categoryService', 'audioService', function($scope, categoryService, audioService) {

    getCategoriesWithTop();
    $scope.categories = [];

    $scope.getCategoriesWithTop = getCategoriesWithTop;
    $scope.findTopCategory = findTopCategory;

    function findTopCategory(idCategory){
        for (var i = 0; i < $scope.categories.length; i++){
            var topAudios = $scope.categories[i];
            if (topAudios.id == idCategory){
                return topAudios.audios;
            }
        }
        return [];
    }

    function getCategoriesWithTop(){
        audioService.getCategoriesWithTop(5)
            .then(function (response) {
                $scope.categories = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar las categorias con su top de audios: ' + error.message;
            });
    };
}]);