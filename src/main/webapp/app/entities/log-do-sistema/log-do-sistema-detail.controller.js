(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('LogDoSistemaDetailController', LogDoSistemaDetailController);

    LogDoSistemaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LogDoSistema'];

    function LogDoSistemaDetailController($scope, $rootScope, $stateParams, previousState, entity, LogDoSistema) {
        var vm = this;

        vm.logDoSistema = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:logDoSistemaUpdate', function(event, result) {
            vm.logDoSistema = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
