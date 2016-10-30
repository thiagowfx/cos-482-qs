(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('SecretarioAcademicoDialogController', SecretarioAcademicoDialogController);

    SecretarioAcademicoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SecretarioAcademico', 'Usuario'];

    function SecretarioAcademicoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SecretarioAcademico, Usuario) {
        var vm = this;

        vm.secretarioAcademico = entity;
        vm.clear = clear;
        vm.save = save;
        vm.usuarios = Usuario.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.secretarioAcademico.id !== null) {
                SecretarioAcademico.update(vm.secretarioAcademico, onSaveSuccess, onSaveError);
            } else {
                SecretarioAcademico.save(vm.secretarioAcademico, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:secretarioAcademicoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
