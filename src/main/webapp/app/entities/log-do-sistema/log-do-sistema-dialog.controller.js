(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('LogDoSistemaDialogController', LogDoSistemaDialogController);

    LogDoSistemaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LogDoSistema'];

    function LogDoSistemaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LogDoSistema) {
        var vm = this;

        vm.logDoSistema = entity;
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
            if (vm.logDoSistema.id !== null) {
                LogDoSistema.update(vm.logDoSistema, onSaveSuccess, onSaveError);
            } else {
                LogDoSistema.save(vm.logDoSistema, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:logDoSistemaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.timestampFuncao = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
