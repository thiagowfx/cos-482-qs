(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarProfessorController', CadastrarProfessorController);

    CadastrarProfessorController.$inject = ['Principal', '$window', '$scope', '$state', '$translate', 'professor_entity', 'Professor', 'LogDoSistema', 'log_entity'];

    function CadastrarProfessorController (Principal, $window, $scope, $state, $translate, professor_entity, Professor, LogDoSistema, log_entity) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;

        vm.professor = professor_entity;
        vm.log = log_entity;

        function clear() {
            $window.document.getElementById('cadastrar-professor-name').value = "";
            $window.document.getElementById('cadastrar-professor-siape').value = "";

            vm.professor = professor_entity;
            vm.log = log_entity;
        }

        function save() {
            vm.isSaving = true;
            Professor.save(vm.professor, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            LogUseCase();
            $window.alert($translate.instant('cadastrar-professor.alert.success'));
            vm.clear();
        }

        function onSaveError () {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-professor.alert.failure'));
        }

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                vm.log.funcao = 2;
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
