mainApp.factory('categoryFactory', function($resource) {
  return $resource('http://localhost:8000/api/categories/:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
});
