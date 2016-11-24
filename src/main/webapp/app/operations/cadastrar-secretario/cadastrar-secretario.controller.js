(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarSecretarioController', CadastrarSecretarioController);

    CadastrarSecretarioController.$inject = ['$window', '$scope', '$state', '$translate', 'secretario_entity', 'usuario_entity', 'user_entity', 'SecretarioAcademico', 'User', 'Usuario'];

    function CadastrarSecretarioController ($window, $scope, $state, $translate, secretario_entity, usuario_entity, user_entity, SecretarioAcademico, User, Usuario) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;

        vm.secretario = secretario_entity;
        vm.usuario = usuario_entity;
        vm.user = user_entity;

        function clear() {
            $window.document.getElementById('cadastrar-secretario-login').value = "";
            $window.document.getElementById('cadastrar-secretario-email').value = "";
            $window.document.getElementById('cadastrar-secretario-name').value = "";
            $window.document.getElementById('cadastrar-secretario-cpf').value = "";
            $window.document.getElementById('cadastrar-secretario-rg').value = "";
            $window.document.getElementById('cadastrar-secretario-titulo').value = "";
            $window.document.getElementById('cadastrar-secretario-dispensa').value = "";
            $window.document.getElementById('cadastrar-secretario-passport').value = "";

            vm.secretario = secretario_entity;
            vm.usuario = usuario_entity;
            vm.user = user_entity;
        }

        function save() {
            vm.isSaving = true;

            Usuario.save(vm.usuario, function(){}, function(){}).$promise.then(function(usuario) {
                vm.secretario.usuarioId = usuario.id;
                SecretarioAcademico.save(vm.secretario, onSaveSuccess, onSaveError);
            })

            // TODO: documents of Usuario
            // TODO: User.save
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-secretario.alert.success'));
            vm.clear();
        }

        function onSaveError () {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-secretario.alert.failure'));
        }
    }
})();
