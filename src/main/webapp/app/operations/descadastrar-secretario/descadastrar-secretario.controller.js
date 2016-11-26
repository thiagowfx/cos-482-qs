(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarSecretarioController', DescadastrarSecretarioController);

    DescadastrarSecretarioController.$inject = ['$window', '$scope', '$state', '$translate', 'SecretarioAcademico', 'Usuario'];

    function DescadastrarSecretarioController ($window, $scope, $state, $translate, SecretarioAcademico, Usuario) {
        var vm = this;
        
        vm.secretarioAcademicos = [];
        vm.usuarios = [];

        loadAll();

        function loadAll() {
            SecretarioAcademico.query(function(result) {
                vm.secretarioAcademicos = result;
                console.log(result);

                for (var i = 0; i < vm.secretarioAcademicos.length; i++) {
                    (function(i) {
                        Usuario.get(
                            {id: vm.secretarioAcademicos[i].usuarioId},
                            function (result) {
                                console.log(result);
                                vm.secretarioAcademicos[i].usuario = result;
                            }
                        );
                    })(i);
                }
            });
        }
    }
})();