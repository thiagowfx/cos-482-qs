(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarAlunoController', DescadastrarAlunoController);

    DescadastrarAlunoController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'Aluno', 'Usuario', 'DocumentoIdentificacao'];

    function DescadastrarAlunoController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, Aluno, Usuario, DocumentoIdentificacao) {
        var vm = this;
        
        vm.allAlunos = [];
        vm.alunos = [];
        vm.usuarios = [];
        vm.deleteAluno = deleteAluno;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            Aluno.query(function(result) {
                vm.allAlunos = result;

                for (var i = 0; i < vm.allAlunos.length; i++) {
                    (function(i) {
                        Usuario.get(
                            {id: vm.allAlunos[i].usuarioId},
                            function (result) {

                                if(result.conta == "ATIVA")
                                {
                                    vm.allAlunos[i].usuario = result;
                                    DocumentoIdentificacao.get(
                                        {id: result.cpfId},
                                        function(innerResult) {
                                            vm.allAlunos[i].cpf = innerResult.valor;
                                            vm.allAlunos[i].indexOnArray = vm.alunos.length;
                                            vm.alunos.push(vm.allAlunos[i]);
                                        }
                                    );
                                }

                            }
                        );
                    })(i);
                }


            });
        }

        function deleteAluno(id) {
            if($window.confirm($translate.instant('descadastrar-aluno.confirm'))){
                LogUseCase();
                vm.alunos[id].usuario.conta = "INATIVA";
                vm.isSaving = true;
                Usuario.update(vm.alunos[id].usuario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('descadastrar-aluno.alert.success'));
            vm.isSaving = false;
            $state.reload();
        }

        function onSaveError () {
            $window.alert($translate.instant('descadastrar-aluno.alert.error'));
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
