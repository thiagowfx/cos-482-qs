(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarAlunoDetailController', DescadastrarAlunoDetailController);

    DescadastrarAlunoDetailController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno', 'Usuario', 'DocumentoIdentificacao'];

    function DescadastrarAlunoDetailController(Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Aluno, Usuario, DocumentoIdentificacao) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;
        vm.deleteAluno = deleteAluno;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            Usuario.get(
                {id: vm.aluno.usuarioId},
                function (result) {
                    console.log(result.conta);
                    vm.aluno.usuario = result;
                    DocumentoIdentificacao.get(
                        {id: result.cpfId},
                        function(innerResult) {
                            vm.aluno.cpf = innerResult.valor;
                        }
                    );
                }
            );
        }

        function deleteAluno() {
            if($window.confirm($translate.instant('descadastrar-aluno.confirm'))){
                LogUseCase();
                vm.aluno.usuario.conta = "INATIVA";
                vm.isSaving = true;
                Usuario.update(vm.aluno.usuario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('descadastrar-aluno.alert.success'));
            vm.isSaving = false;
            $state.go(vm.previousState);
        }

        function onSaveError () {
            $window.alert($translate.instant('descadastrar-aluno.alert.error'));
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
