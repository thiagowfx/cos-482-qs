(function() {
    'use strict';
    angular
        .module('cos482App')
        .factory('DocumentoIdentificacao', DocumentoIdentificacao);

    DocumentoIdentificacao.$inject = ['$resource'];

    function DocumentoIdentificacao ($resource) {
        var resourceUrl =  'api/documento-identificacaos/:id';

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
