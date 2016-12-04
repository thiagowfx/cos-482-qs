(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('VerificarInformacoesAlunoController', VerificarInformacoesAlunoController);

    VerificarInformacoesAlunoController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'Usuario', 'DocumentoIdentificacao'];

    function VerificarInformacoesAlunoController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, Aluno, AlunoMestrado, AlunoDoutorado, Usuario, DocumentoIdentificacao) {
        var vm = this;

        vm.alunosMestrado = [];
        vm.alunosDoutorado = [];

        loadAll();

        function loadAll() {
            AlunoMestrado.query(function(result) {
                vm.alunosMestrado = result;
                console.log(vm.alunosMestrado);
                for (var i = 0; i < vm.alunosMestrado.length; i++) {
                    (function(i) {
                        Aluno.get(
                            {id: vm.alunosMestrado[i].alunoId},
                            function (result) {

                                vm.alunosMestrado[i].aluno = result;
                                Usuario.get({id: result.usuarioId},
                                    function(u){
                                        console.log(u, i);
                                        vm.alunosMestrado[i].usuario = u;
                                    }
                                );
                            }
                        );
                    })(i);
                }
            });
            AlunoDoutorado.query(function(result) {
                vm.alunosDoutorado = result;
                console.log(vm.alunosDoutorado);
                for (var i = 0; i < vm.alunosDoutorado.length; i++) {
                    (function(i) {
                        Aluno.get(
                            {id: vm.alunosDoutorado[i].alunoId},
                            function (result) {

                                vm.alunosDoutorado[i].aluno = result;
                                Usuario.get({id: result.usuarioId},
                                    function(u){
                                        console.log(u, i);
                                        vm.alunosDoutorado[i].usuario = u;
                                    }
                                );
                            }
                        );
                    })(i);
                }
            });
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
