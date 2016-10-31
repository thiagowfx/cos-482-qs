(function() {
    'use strict';
    angular
        .module('cos482App')
        .factory('SecretarioAcademico', SecretarioAcademico);

    SecretarioAcademico.$inject = ['$resource'];

    function SecretarioAcademico ($resource) {
        var resourceUrl =  'api/secretario-academicos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
