(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoMestradoDeleteController',AlunoMestradoDeleteController);

    AlunoMestradoDeleteController.$inject = ['$uibModalInstance', 'entity', 'AlunoMestrado'];

    function AlunoMestradoDeleteController($uibModalInstance, entity, AlunoMestrado) {
        var vm = this;

        vm.alunoMestrado = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AlunoMestrado.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
