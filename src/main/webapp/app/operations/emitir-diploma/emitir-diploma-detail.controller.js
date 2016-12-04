(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaDetailController', EmitirDiplomaDetailController);

    EmitirDiplomaDetailController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'Usuario', 'DocumentoIdentificacao', 'DocumentoSistema'];

    function EmitirDiplomaDetailController(Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Aluno, AlunoMestrado, AlunoDoutorado, Usuario, DocumentoIdentificacao, DocumentoSistema) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;
        vm.concludeMatricula = concludeMatricula;
        vm.aluno.documentos = [
            {
                "tipo": "Declaração de Conclusão",
                "id": entity.declaracaoConclusaoId || "Inexistente"
            },
            {
                "tipo" : "Histórico de Graduação",
                "id": entity.historicoGraduacaoId || "Inexistente"
            }
        ];

        vm.log = log_entity;

        loadAll();

        function loadAll() {
        	Usuario.get(
                    {id: vm.aluno.usuarioId},
                    function (result) {

                        vm.aluno.usuario = result;
                        var documentos = ["cpf", "rg", "tituloDeEleitor", "dispensaMilitar", "passaporte"];

                        //Get all DocumentoIdentificacao
                        var i = 0;
                        for(var i = 0; i < documentos.length; i++){
                            (function(d){
                                DocumentoIdentificacao.get({id: result[d+"Id"]}, 
                                    function (innerResult) {
                                        //console.log(innerResult, d);
                                        vm.aluno.usuario[d] = innerResult.valor;
                                        //console.log(vm.aluno.usuario);
                                    }
                                );
                            })(documentos[i]);
                        }

                        //Get all DocumentoSistema
                        var mestrado = [];
                        var doutorado = [];
                        var documentos = [];
                        AlunoMestrado.query(function(m){
                            console.log(vm.aluno.id);
                            for(var j = 0; j<m.length; j++){
                                if(m[j].alunoId == vm.aluno.id) {
                                    vm.aluno.tipo = "Mestrado";
                                    vm.aluno.documentos.push({
                                        "tipo": "Diploma de Graduação",
                                        "id": m[j].diplomaGraduacaoId || "Inexistente"
                                    });
                                    vm.aluno.documentos.push({
                                        "tipo": "Certidão de Conclusão",
                                        "id": m[j].certidaoConclusaoId || "Inexistente"
                                    });
                                    vm.aluno.documentos.push({
                                        "tipo": "Certidão de Colação",
                                        "id": m[j].certidaoColacaoId || "Inexistente"
                                    });
                                }
                            }
                        });
                        AlunoDoutorado.query(function(m){
                            console.log(vm.aluno.id);
                            for(var j = 0; j<m.length; j++){
                                if(m[j].alunoId == vm.aluno.id) {
                                    vm.aluno.tipo = "Doutorado";
                                    vm.aluno.documentos.push({
                                        "tipo": "Ata Dissertação",
                                        "id": m[j].ataDissertacaoId || "Inexistente"
                                    });
                                    vm.aluno.documentos.push({
                                        "tipo": "Certidão Conclusão",
                                        "id": m[j].certidaoConclusaoId || "Inexistente"
                                    });
                                    vm.aluno.documentos.push({
                                        "tipo": "Diploma Mestrado",
                                        "id": m[j].diplomaMestradoId || "Inexistente"
                                    });
                                }
                            }
                        });

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
