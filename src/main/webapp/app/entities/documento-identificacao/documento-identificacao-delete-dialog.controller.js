(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoIdentificacaoDeleteController',DocumentoIdentificacaoDeleteController);

    DocumentoIdentificacaoDeleteController.$inject = ['$uibModalInstance', 'entity', 'DocumentoIdentificacao'];

    function DocumentoIdentificacaoDeleteController($uibModalInstance, entity, DocumentoIdentificacao) {
        var vm = this;

        vm.documentoIdentificacao = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            DocumentoIdentificacao.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
