(function() {
    'use strict';
    angular
        .module('cos482App')
        .factory('LogDoSistema', LogDoSistema);

    LogDoSistema.$inject = ['$resource', 'DateUtils'];

    function LogDoSistema ($resource, DateUtils) {
        var resourceUrl =  'api/log-do-sistemas/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.timestampFuncao = DateUtils.convertDateTimeFromServer(data.timestampFuncao);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
