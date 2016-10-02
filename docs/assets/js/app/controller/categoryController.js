mainApp.controller('categoryController', ['$scope', 'categoryFactory', function($scope, categoryFactory) {

    $scope.getTopAudios = function (idCategory, top) {
        return [
            {
                "id": 3,
                "title": "Songs of John" + idCategory,
                "audio": "https://dl.dropboxusercontent.com/s/w1lezxvjeqwbtkr/Creep.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists": [
                    "Artista 1"
                ],
                "categories": [
                    1,
                    2
                ]
            },
            {
                "id": 3,
                "title": "Canción 2" + idCategory,
                "audio": "https://dl.dropboxusercontent.com/s/wxmovmshfsiwk4c/04%20The%20Man%20Who%20Sold%20The%20World.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists":[
                    "Artista 2"
                ],
                "categories": [
                    1,
                    2
                ]
            },
            {
                "id": 3,
                "title": "Soy la 3" + idCategory,
                "audio": "https://dl.dropboxusercontent.com/s/f3lrpvehp6a5fpb/05%20Falling.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists":[
                    "Artista 3"
                ],
                "categories": [
                    1,
                    2
                ]
            }
        ];
    }

    getCategory();

    function getCategory() {
        categoryFactory.getCategories()
            .then(function (response) {
                $scope.categories = response.data;
            }, function (error) {
                $scope.status = 'No es posible cargar la categoria: ' + error.message;
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

         categoryFactory.updateCategory(category)
          .then(function (response) {
              $scope.status = 'Categoria actualizada!...Refrescando la lista de categorias.';
          }, function (error) {
              $scope.status = 'No es posible actualizar la categoria: ' + error.message;
          });
    };

    $scope.insertCategory = function (category) {
        categoryFactory.insertCategory(category)
            .then(function (response) {
                $scope.status = 'Categoria creada!...Refrescando la lista de categorias.';
                $scope.categories.push(category);
            }, function(error) {
                $scope.status = 'No es posible crear la Categoria: ' + error.message;
            });
    };

    $scope.deleteCategory = function (id) {
        categoryFactory.deleteCategory(id)
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