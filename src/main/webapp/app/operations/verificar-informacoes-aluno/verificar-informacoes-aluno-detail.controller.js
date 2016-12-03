(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('VerificarInformacoesAlunoDetailController', VerificarInformacoesAlunoDetailController);

    VerificarInformacoesAlunoDetailController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno', 'Usuario', 'DocumentoIdentificacao', 'DocumentoSistema'];

    function VerificarInformacoesAlunoDetailController(Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Aluno, Usuario, DocumentoIdentificacao, DocumentoSistema) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            console.log(vm.aluno);
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

                }
            );
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
