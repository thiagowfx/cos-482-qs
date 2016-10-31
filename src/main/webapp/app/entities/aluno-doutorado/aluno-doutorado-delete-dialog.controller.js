(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDoutoradoDeleteController',AlunoDoutoradoDeleteController);

    AlunoDoutoradoDeleteController.$inject = ['$uibModalInstance', 'entity', 'AlunoDoutorado'];

    function AlunoDoutoradoDeleteController($uibModalInstance, entity, AlunoDoutorado) {
        var vm = this;

        vm.alunoDoutorado = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AlunoDoutorado.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
