(function() {
    'use strict';
    angular
        .module('cos482App')
        .factory('AlunoMestrado', AlunoMestrado);

    AlunoMestrado.$inject = ['$resource'];

    function AlunoMestrado ($resource) {
        var resourceUrl =  'api/aluno-mestrados/:id';

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
