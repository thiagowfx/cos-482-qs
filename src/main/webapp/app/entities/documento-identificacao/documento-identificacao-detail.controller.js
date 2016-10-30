(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoIdentificacaoDetailController', DocumentoIdentificacaoDetailController);

    DocumentoIdentificacaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'DocumentoIdentificacao'];

    function DocumentoIdentificacaoDetailController($scope, $rootScope, $stateParams, previousState, entity, DocumentoIdentificacao) {
        var vm = this;

        vm.documentoIdentificacao = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:documentoIdentificacaoUpdate', function(event, result) {
            vm.documentoIdentificacao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
