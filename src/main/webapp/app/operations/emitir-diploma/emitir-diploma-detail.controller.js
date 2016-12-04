(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaDetailController', EmitirDiplomaDetailController);

    EmitirDiplomaDetailController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno', 'Usuario'];

    function EmitirDiplomaDetailController(Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Aluno, Usuario) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;
        vm.concludeMatricula = concludeMatricula;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            Usuario.get(
                {id: vm.aluno.usuarioId},
                function (result) {
                    console.log(result.conta);
                    vm.aluno.usuario = result;
                }
            );
        }

        function concludeMatricula() {
            if($window.confirm($translate.instant('emitir-diploma.confirm'))){
                LogUseCase();
                vm.aluno.matricula = "INATIVA";
                vm.isSaving = true;
                Aluno.update(vm.aluno, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('emitir-diploma.alert.success'));
            vm.isSaving = false;
            $state.reload();
        }

        function onSaveError () {
            $window.alert($translate.instant('emitir-diploma.alert.error'));
            vm.isSaving = false;
            $state.reload();
        }

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
