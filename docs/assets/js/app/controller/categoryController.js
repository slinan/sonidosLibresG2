mainApp.controller('categoryController', ['$scope', 'categoryService', function($scope, categoryService) {

    $scope.getCategories = function () {
        categoryService.getCategories()
            .then(function (response) {
                $scope.categories = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar las categorias: ' + error.message;
            });
    };

    $scope.updateCategory = function (id) {
        var category;
        for (var i = 0; i < $scope.categories.length; i++) {
            var currentCategory= $scope.categories[i];
            if (currentCategory.id === id) {
                category = currentCategory;
                break;
            }
        }

         categoryService.updateCategory(category)
          .then(function (response) {
              $scope.status = 'Categoria actualizada!...Refrescando la lista de categorias.';
          }, function (error) {
              $scope.status = 'No es posible actualizar la categoria: ' + error.message;
          });
    };

    $scope.insertCategory = function (category) {
        categoryService.insertCategory(category)
            .then(function (response) {
                $scope.status = 'Categoria creada!...Refrescando la lista de categorias.';
                $scope.categories.push(category);
            }, function(error) {
                $scope.status = 'No es posible crear la Categoria: ' + error.message;
            });
    };

    $scope.deleteCategory = function (id) {
        categoryService.deleteCategory(id)
        .then(function (response) {
            $scope.status = 'Categoria eliminada!...Refrescando la lista de categorias.';
            for (var i = 0; i < $scope.categories.length; i++) {
                var category = $scope.categories[i];
                if (category.ID === id) {
                    $scope.categories.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            $scope.status = 'No es posible eliminar la categoria: ' + error.message;
        });
    };
}]);