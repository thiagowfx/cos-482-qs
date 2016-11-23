(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarSecretarioController', CadastrarSecretarioController);

    CadastrarSecretarioController.$inject = ['$window', '$scope', '$state', '$translate', 'entity', 'SecretarioAcademico'];

    function CadastrarSecretarioController ($window, $scope, $state, $translate, entity, SecretarioAcademico) {
        var vm = this;

        vm.secretario = entity;
        vm.clear = clear;
        vm.save = save;

        function clear() {
            $window.document.getElementById('cadastrar-secretario-name').value = "";
        }

        function save() {
            // vm.isSaving = true;
            // Professor.save(vm.professor, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            // vm.isSaving = false;
            // $window.alert($translate.instant('cadastrar-professor.alert.success'));
            // vm.clear();
        }

        function onSaveError () {
            // $window.alert($translate.instant('cadastrar-professor.alert.failure'));
            // vm.isSaving = false;
        }
    }
})();
