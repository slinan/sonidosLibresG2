mainApp.factory('categoryService', ['$http', function($http) {

    var urlBase = 'https://sonidoslibres.herokuapp.com/api/categories';
    var categoryService= {};

    categoryService.getCategories = function () {
        return $http.get(urlBase + '/');
    };

    categoryService.getCategory = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    categoryService.insertCategory = function (category) {
        return $http.post(urlBase, category);
    };

    categoryService.updateCategory = function (category) {
        return $http.put(urlBase + '/' + category.id, category)
    };

    categoryService.deleteCategory = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return categoryService;
}]);

