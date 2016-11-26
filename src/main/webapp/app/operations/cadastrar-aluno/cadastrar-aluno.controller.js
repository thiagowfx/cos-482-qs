(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarAlunoController', CadastrarAlunoController);

    CadastrarAlunoController.$inject = ['$window', '$scope', '$state', '$translate', 'aluno_entity', 'usuario_entity', 'user_entity', 'Aluno', 'User', 'Usuario'];

    function CadastrarAlunoController ($window, $scope, $state, $translate, aluno_entity, usuario_entity, user_entity, Aluno, User, Usuario) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;

        vm.aluno = aluno_entity;
        vm.usuario = usuario_entity;
        vm.user = user_entity;

        function clear() {
            $window.document.getElementById('cadastrar-aluno-login').value = "";
            $window.document.getElementById('cadastrar-aluno-email').value = "";
            $window.document.getElementById('cadastrar-aluno-name').value = "";
            $window.document.getElementById('cadastrar-aluno-cpf').value = "";
            $window.document.getElementById('cadastrar-aluno-rg').value = "";
            $window.document.getElementById('cadastrar-aluno-titulo').value = "";
            $window.document.getElementById('cadastrar-aluno-dispensa').value = "";
            $window.document.getElementById('cadastrar-aluno-passport').value = "";

            vm.aluno = aluno_entity;
            vm.usuario = usuario_entity;
            vm.user = user_entity;
        }

        function save() {
            vm.isSaving = true;

            Usuario.save(vm.usuario, function(){}, function(){}).$promise.then(function(usuario) {
            	
            	console.log(vm.aluno);
                vm.aluno.usuarioId = usuario.id;
                Aluno.save(vm.aluno, onSaveSuccess, onSaveError);
            })

            // TODO: documents of Usuario
            // TODO: User.save
            // TODO: Differentiate AlunoMestrado from AlunoDoutorado somehow
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $window.alert(/*$translate.instant('cadastrar-aluno.alert.success')*/'Salvo');
            vm.clear();
        }

        function onSaveError () {
            vm.isSaving = false;
            $window.alert(/*$translate.instant('cadastrar-aluno.alert.failure')*/'Erro');
        }
    }
})();
