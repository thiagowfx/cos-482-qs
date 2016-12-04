(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('ValidarDocumentoController', ValidarDocumentoController);

    ValidarDocumentoController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'Usuario', 'DocumentoSistema'];

    function ValidarDocumentoController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, Aluno, AlunoMestrado, AlunoDoutorado, Usuario, DocumentoSistema) {
        var vm = this;

        vm.alunosMestrado = [];
        vm.alunosDoutorado = [];
        vm.accept = accept;
        vm.refuse = refuse;

        vm.log = log_entity;

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
                                DocumentoSistema.get({id: result.declaracaoConclusaoId}, function(d){
                                    vm.alunosMestrado[i].aluno.declaracaoConclusao = d.status;
                                });
                                
                                DocumentoSistema.get({id: result.historicoGraduacaoId}, function(d){
                                    vm.alunosMestrado[i].aluno.historicoGraduacao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosMestrado[i].diplomaGraduacaoId}, function(d){
                                    vm.alunosMestrado[i].aluno.diplomaGraduacao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosMestrado[i].certidaoConclusaoId}, function(d){
                                    vm.alunosMestrado[i].aluno.certidaoConclusao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosMestrado[i].certidaoColacaoId}, function(d){
                                    vm.alunosMestrado[i].aluno.certidaoColacao = d.status;
                                });
                                /*
                                */
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
                                        console.log(vm.alunosDoutorado);
                                    }
                                );
                                DocumentoSistema.get({id: result.declaracaoConclusaoId}, function(d){
                                    vm.alunosDoutorado[i].aluno.declaracaoConclusao = d.status;
                                });
                                DocumentoSistema.get({id: result.historicoGraduacaoId}, function(d){
                                    vm.alunosDoutorado[i].aluno.historicoGraduacao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosDoutorado[i].ataDissertacaoId}, function(d){
                                    vm.alunosDoutorado[i].aluno.ataDissertacao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosDoutorado[i].certidaoConclusaoId}, function(d){
                                    vm.alunosDoutorado[i].aluno.certidaoConclusao = d.status;
                                });
                                DocumentoSistema.get({id: vm.alunosDoutorado[i].diplomaMestradoId}, function(d){
                                    vm.alunosDoutorado[i].aluno.diplomaMestrado = d.status;
                                });
                            }
                        );
                    })(i);
                }
            });
        }

        function refuse(id) {
            if($window.confirm($translate.instant('validar-documento.refuse'))){
                DocumentoSistema.get(
                    {id: id},
                    function(d){
                        if(d.status != "ENVIADO"){
                            $window.alert($translate.instant('validar-documento.notEnviado'));
                            return;
                        }
                        d.status = "PENDENTE";
                        vm.isSaving = true;
                        DocumentoSistema.update(d, onSaveSuccess, onSaveError);
                    }
                );
            }
        }

        function accept(id) {
            if($window.confirm($translate.instant('validar-documento.accept'))){
                DocumentoSistema.get(
                    {id: id},
                    function(d){
                        if(d.status != "ENVIADO"){
                            $window.alert($translate.instant('validar-documento.notEnviado'));
                            return;
                        }
                        d.status = "ACEITO";
                        vm.isSaving = true;
                        DocumentoSistema.update(d, onSaveSuccess, onSaveError);
                    }
                );
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('validar-documento.success'));
            LogUseCase();
            vm.isSaving = false;
            $state.reload();
        }

        function onSaveError () {
            $window.alert($translate.instant('validar-documento.error'));
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
