(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarSecretarioController', DescadastrarSecretarioController);

    DescadastrarSecretarioController.$inject = ['$window', '$scope', '$state', '$translate', 'SecretarioAcademico', 'Usuario', 'DocumentoIdentificacao'];

    function DescadastrarSecretarioController ($window, $scope, $state, $translate, SecretarioAcademico, Usuario, DocumentoIdentificacao) {
        var vm = this;
        
        vm.allSecretarios = [];
        vm.secretarioAcademicos = [];
        vm.usuarios = [];

        loadAll();

        function loadAll() {
            SecretarioAcademico.query(function(result) {
                vm.allSecretarios = result;
                console.log(result);

                for (var i = 0; i < vm.allSecretarios.length; i++) {
                    (function(i) {
                        Usuario.get(
                            {id: vm.allSecretarios[i].usuarioId},
                            function (result) {

                                console.log(result);
                                if(result.conta == "ATIVA")
                                {
                                    vm.allSecretarios[i].usuario = result;
                                    DocumentoIdentificacao.get(
                                        {id: result.cpfId},
                                        function(innerResult) {
                                            vm.allSecretarios[i].cpf = innerResult.valor;
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
    }
})();