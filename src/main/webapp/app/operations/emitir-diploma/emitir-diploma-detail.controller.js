(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaDetailController', EmitirDiplomaDetailController);

    EmitirDiplomaDetailController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno'];


    function EmitirDiplomaDetailController(Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Aluno) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;
        vm.printDiploma = printDiploma;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            Usuario.get(
                {id: vm.secretario.usuarioId},
                function (result) {
                    console.log(result.conta);
                    vm.secretario.usuario = result;
                    DocumentoIdentificacao.get(
                        {id: result.cpfId},
                        function(innerResult) {
                            vm.secretario.cpf = innerResult.valor;
                        }
                    );
                }
            );
        }

        function printDiploma() {
            if($window.confirm($translate.instant('emitir-diploma.confirm'))){
                LogUseCase();
                vm.aluno.matricula = "INATIVA";
                vm.isSaving = true;
                Usuario.update(vm.secretario.usuario, onSaveSuccess, onSaveError);
            }
        }

        function deleteSecretario() {
            if($window.confirm($translate.instant('descadastrar-secretario.confirm'))){
                LogUseCase();
                vm.secretario.usuario.conta = "INATIVA";
                vm.isSaving = true;
                Usuario.update(vm.secretario.usuario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('descadastrar-secretario.alert.success'));
            vm.isSaving = false;
            $state.go(vm.previousState);
        }

        function onSaveError () {
            $window.alert($translate.instant('descadastrar-secretario.alert.error'));
            vm.isSaving = false;
            $state.go(vm.previousState);
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
