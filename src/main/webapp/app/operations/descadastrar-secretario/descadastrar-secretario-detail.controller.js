(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarSecretarioDetailController', DescadastrarSecretarioDetailController);

    DescadastrarSecretarioDetailController.$inject = ['$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'SecretarioAcademico', 'Usuario', 'DocumentoIdentificacao'];

    function DescadastrarSecretarioDetailController($window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, SecretarioAcademico, Usuario, DocumentoIdentificacao) {
        var vm = this;

        vm.secretario = entity;
        vm.previousState = previousState.name;
        vm.deleteSecretario = deleteSecretario;

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

        function deleteSecretario(id) {
            vm.secretario.usuario.conta = "INATIVA";
            vm.isSaving = true;
            Usuario.update(vm.secretario.usuario, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            console.log(result);
            vm.isSaving = false;
            $state.go(vm.previousState);
        }

        function onSaveError () {
            console.log("Erro ao deletar secretario academico.");
            vm.isSaving = false;
            $state.go(vm.previousState);
        }
    }
})();
