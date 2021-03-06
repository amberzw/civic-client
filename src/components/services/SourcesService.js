(function() {
  'use strict';
  angular.module('civic.services')
    .factory('SourcesResource', SourcesResource)
    .factory('Sources', SourcesService);

  // @ngInject
  function SourcesResource($resource) {
    return $resource('/api/sources',
      {},
      {
        query: {
          method: 'GET',
          isArray: true,
          cache: true
        },
        get: {
          method: 'GET',
          url: '/api/sources/:sourceId',
          isArray: false,
          cache: true
        }
      }
    );
  }

  // @ngInject
  function SourcesService(SourcesResource) {
    var item = {};
    var collection = [];

    return {
      data: {
        item: item,
        collection: collection
      },
      query: query,
      get: get
    };

    function query() {
      return SourcesResource.query().$promise
        .then(function(response) {
          angular.copy(response, collection);
          return response.$promise;
        });
    }

    function get(sourceId) {
      return SourcesResource.get({sourceId: sourceId}).$promise
        .then(function(response) {
          angular.copy(response, item);
          return response.$promise;
        });
    }
  }
})();
