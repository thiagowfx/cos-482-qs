(function() {
    'use strict';
    angular
        .module('cos482App')
        .factory('AlunoDoutorado', AlunoDoutorado);

    AlunoDoutorado.$inject = ['$resource'];

    function AlunoDoutorado ($resource) {
        var resourceUrl =  'api/aluno-doutorados/:id';

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
