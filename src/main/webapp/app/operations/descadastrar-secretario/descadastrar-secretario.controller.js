(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarSecretarioController', DescadastrarSecretarioController);

    DescadastrarSecretarioController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'SecretarioAcademico', 'Usuario', 'DocumentoIdentificacao'];

    function DescadastrarSecretarioController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, SecretarioAcademico, Usuario, DocumentoIdentificacao) {
        var vm = this;

        vm.allSecretarios = [];
        vm.secretarioAcademicos = [];
        vm.usuarios = [];
        vm.deleteSecretario = deleteSecretario;

        vm.log = log_entity;

        loadAll();

        function loadAll() {
            SecretarioAcademico.query(function(result) {
                vm.allSecretarios = result;

                for (var i = 0; i < vm.allSecretarios.length; i++) {
                    (function(i) {
                        Usuario.get(
                            {id: vm.allSecretarios[i].usuarioId},
                            function (result) {

                                if(result.conta == "ATIVA")
                                {
                                    vm.allSecretarios[i].usuario = result;
                                    DocumentoIdentificacao.get(
                                        {id: result.cpfId},
                                        function(innerResult) {
                                            vm.allSecretarios[i].cpf = innerResult.valor;
                                            vm.allSecretarios[i].indexOnArray = vm.secretarioAcademicos.length;
                                            vm.secretarioAcademicos.push(vm.allSecretarios[i]);
                                        }
                                    );
                                }

                            }
                        );
                    })(i);
                }


            });
        }

        function deleteSecretario(id) {
            if($window.confirm($translate.instant('descadastrar-secretario.confirm'))){
                LogUseCase();
                vm.secretarioAcademicos[id].usuario.conta = "INATIVA";
                vm.isSaving = true;
                Usuario.update(vm.secretarioAcademicos[id].usuario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('descadastrar-secretario.alert.success'));
            vm.isSaving = false;
            $state.reload();
        }

        function onSaveError () {
            $window.alert($translate.instant('descadastrar-secretario.alert.error'));
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