(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoSistemaDeleteController',DocumentoSistemaDeleteController);

    DocumentoSistemaDeleteController.$inject = ['$uibModalInstance', 'entity', 'DocumentoSistema'];

    function DocumentoSistemaDeleteController($uibModalInstance, entity, DocumentoSistema) {
        var vm = this;

        vm.documentoSistema = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            DocumentoSistema.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
