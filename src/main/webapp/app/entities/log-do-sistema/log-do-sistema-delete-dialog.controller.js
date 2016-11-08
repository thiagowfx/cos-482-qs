(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('LogDoSistemaDeleteController',LogDoSistemaDeleteController);

    LogDoSistemaDeleteController.$inject = ['$uibModalInstance', 'entity', 'LogDoSistema'];

    function LogDoSistemaDeleteController($uibModalInstance, entity, LogDoSistema) {
        var vm = this;

        vm.logDoSistema = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LogDoSistema.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
