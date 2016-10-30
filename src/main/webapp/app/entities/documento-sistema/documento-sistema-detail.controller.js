(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoSistemaDetailController', DocumentoSistemaDetailController);

    DocumentoSistemaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'DocumentoSistema'];

    function DocumentoSistemaDetailController($scope, $rootScope, $stateParams, previousState, entity, DocumentoSistema) {
        var vm = this;

        vm.documentoSistema = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:documentoSistemaUpdate', function(event, result) {
            vm.documentoSistema = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
