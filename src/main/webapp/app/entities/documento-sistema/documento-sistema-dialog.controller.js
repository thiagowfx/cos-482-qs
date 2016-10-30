(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoSistemaDialogController', DocumentoSistemaDialogController);

    DocumentoSistemaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DocumentoSistema'];

    function DocumentoSistemaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DocumentoSistema) {
        var vm = this;

        vm.documentoSistema = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.documentoSistema.id !== null) {
                DocumentoSistema.update(vm.documentoSistema, onSaveSuccess, onSaveError);
            } else {
                DocumentoSistema.save(vm.documentoSistema, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:documentoSistemaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.timestampEnvio = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
