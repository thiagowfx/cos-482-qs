(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarAlunoController', CadastrarAlunoController);

    CadastrarAlunoController.$inject = ['$window', '$scope', '$state', '$translate', 'aluno_entity', 'aluno_mestrado_entity', 'aluno_doutorado_entity', 'usuario_entity', 'user_entity', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'Auth', 'LoginService', 'Usuario'];

    function CadastrarAlunoController ($window, $scope, $state, $translate, aluno_entity, aluno_mestrado_entity, aluno_doutorado_entity, usuario_entity, user_entity, Aluno, AlunoMestrado, AlunoDoutorado, Auth, LoginService, Usuario) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;
        
        vm.alunomestrado = aluno_mestrado_entity;
        vm.alunodoutorado = aluno_doutorado_entity;
        vm.aluno = aluno_entity;
        vm.usuario = usuario_entity;
        
        //user related vm's
        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.registerAccount = {};
        vm.success = null;

        function clear() {
        	$window.document.getElementById('cadastrar-aluno-type').selectedIndex = -1;
            $window.document.getElementById('cadastrar-aluno-login').value = "";
            $window.document.getElementById('cadastrar-aluno-email').value = "";
            $window.document.getElementById('cadastrar-aluno-password').value = "";
            $window.document.getElementById('cadastrar-aluno-confirmpassword').value = "";
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
            
            //user related vm's
            vm.doNotMatch = null;
            vm.error = null;
            vm.errorUserExists = null;
            vm.login = LoginService.open;
            vm.registerAccount = {};
            vm.success = null;
        }

        function save() {
            vm.isSaving = true;
            
            if (vm.registerAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
            	vm.registerAccount.langKey = $translate.use();
                vm.doNotMatch = null;
                vm.error = null;
                vm.errorUserExists = null;
                vm.errorEmailExists = null;

                Auth.createAccount(vm.registerAccount).then(function (qqq) {
                    vm.success = 'OK';
                    qqq.$promise.then(function(www){
                    	console.log(www);
                    	console.log(www.id);
                    });
                    console.log(qqq); //Find a way to get the id
                }).catch(function (response) {
                    vm.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        vm.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        vm.errorEmailExists = 'ERROR';
                    } else {
                        vm.error = 'ERROR';
                    }
                });
            }
            
            if($window.document.getElementById('cadastrar-aluno-type').selectedIndex === 0) {
            	Usuario.save(vm.usuario, function(){}, function(){}).$promise.then(function(usuario) {
                    vm.aluno.usuarioId = usuario.id;
                    Aluno.save(vm.aluno, function(){}, function(){}).$promise.then(function(aluno) {
                    	vm.alunomestrado.alunoId = aluno.id;
                    	AlunoMestrado.save(vm.alunomestrado, onSaveSuccess, onSaveError);
                    });
                    
                })
            }
            else if($window.document.getElementById('cadastrar-aluno-type').selectedIndex === 1) {
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
