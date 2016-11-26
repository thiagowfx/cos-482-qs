(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarAlunoController', CadastrarAlunoController);

    CadastrarAlunoController.$inject = ['$window', '$scope', '$state', '$translate', 'aluno_entity', 'aluno_mestrado_entity', 'aluno_doutorado_entity', 'usuario_entity', 'user_entity', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'User', 'Usuario'];

    function CadastrarAlunoController ($window, $scope, $state, $translate, aluno_entity, aluno_mestrado_entity, aluno_doutorado_entity, usuario_entity, user_entity, Aluno, AlunoMestrado, AlunoDoutorado, User, Usuario) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;
        
        vm.alunomestrado = aluno_mestrado_entity;
        vm.alunodoutorado = aluno_doutorado_entity;
        vm.aluno = aluno_entity;
        vm.usuario = usuario_entity;
        vm.user = user_entity;

        function clear() {
        	$window.document.getElementById('cadastrar-aluno-type').value = "";
            $window.document.getElementById('cadastrar-aluno-login').value = "";
            $window.document.getElementById('cadastrar-aluno-email').value = "";
            $window.document.getElementById('cadastrar-aluno-name').value = "";
            $window.document.getElementById('cadastrar-aluno-cpf').value = "";
            $window.document.getElementById('cadastrar-aluno-rg').value = "";
            $window.document.getElementById('cadastrar-aluno-titulo').value = "";
            $window.document.getElementById('cadastrar-aluno-dispensa').value = "";
            $window.document.getElementById('cadastrar-aluno-passport').value = "";

            vm.alunomestrado = aluno_mestrado_entity;
            vm.alunodoutorado = aluno_doutorado_entity;
            vm.aluno = aluno_entity;
            vm.usuario = usuario_entity;
            vm.user = user_entity;
        }

        function save() {
            vm.isSaving = true;
            
            if($window.document.getElementById('cadastrar-aluno-type').value === 'Mestrado') {
            	Usuario.save(vm.usuario, function(){}, function(){}).$promise.then(function(usuario) {
                    vm.aluno.usuarioId = usuario.id;
                    Aluno.save(vm.aluno, function(){}, function(){}).$promise.then(function(aluno) {
                    	vm.alunomestrado.alunoId = aluno.id;
                    	AlunoMestrado.save(vm.alunomestrado, onSaveSuccess, onSaveError);
                    });
                    
                })
            }
            else if($window.document.getElementById('cadastrar-aluno-type').value === 'Doutorado') {
        		Usuario.save(vm.usuario, function(){}, function(){}).$promise.then(function(usuario) {
                    vm.aluno.usuarioId = usuario.id;
                    Aluno.save(vm.aluno, function(){}, function(){}).$promise.then(function(aluno) {
                    	vm.alunodoutorado.alunoId = aluno.id;
                    	AlunoDoutorado.save(vm.alunodoutorado, onSaveSuccess, onSaveError);
                    });
                })
            }
            else {
            	$window.alert('Selecione o tipo de aluno');
            }
            

            // TODO: documents of Usuario
            // TODO: User.save
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
