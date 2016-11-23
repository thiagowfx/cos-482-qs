(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarSecretarioController', CadastrarSecretarioController);

    CadastrarSecretarioController.$inject = ['$window', '$scope', '$state', '$translate', 'entity', 'SecretarioAcademico', 'User'];

    function CadastrarSecretarioController ($window, $scope, $state, $translate, entity, SecretarioAcademico, User) {
        var vm = this;

        vm.secretario = entity;
        // TODO: set default for ng-model name from Usuario
        vm.clear = clear;
        vm.save = save;

        vm.users = User.query();

        function clear() {
            $window.document.getElementById('cadastrar-secretario-name').value = "";
            $window.document.getElementById('cadastrar-secretario-systemUser').selectedIndex = -1;
            // TODO: clear ng-model name for Usuario
        }

        function save() {
            // TODO: uncomment these whenever we're ready
            // vm.isSaving = true;
            // SecretarioAcademico.save(vm.secretario, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-secretario.alert.success'));
            vm.clear();
        }

        function onSaveError () {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-secretario.alert.failure'));
        }
    }
})();
