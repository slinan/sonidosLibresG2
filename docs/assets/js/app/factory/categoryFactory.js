mainApp.factory('categoryFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8000/api/categories';
    var categoryFactory = {};

    categoryFactory.getCategories = function () {
        return $http.get(urlBase);
    };

    categoryFactory.getCategory = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    categoryFactory.insertCategory = function (cust) {
        return $http.post(urlBase, cust);
    };

    categoryFactory.updateCategory = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    categoryFactory.deleteCategory = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return categoryFactory;
}]);

