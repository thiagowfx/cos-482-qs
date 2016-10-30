(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('SecretarioAcademicoDeleteController',SecretarioAcademicoDeleteController);

    SecretarioAcademicoDeleteController.$inject = ['$uibModalInstance', 'entity', 'SecretarioAcademico'];

    function SecretarioAcademicoDeleteController($uibModalInstance, entity, SecretarioAcademico) {
        var vm = this;

        vm.secretarioAcademico = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SecretarioAcademico.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
