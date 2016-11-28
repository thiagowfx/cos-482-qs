(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarAlunoController', CadastrarAlunoController);

    CadastrarAlunoController.$inject = ['$window', '$scope', '$state', '$translate', 'log_entity', 'LogDoSistema', 'Principal', 'aluno_entity', 'aluno_mestrado_entity', 'aluno_doutorado_entity', 'usuario_entity', 'user_entity', 'cpf_entity', 'rg_entity', 'titulo_entity', 'dispensa_entity', 'passaporte_entity', 'Aluno', 'AlunoMestrado', 'AlunoDoutorado', 'User', 'Usuario', 'DocumentoIdentificacao'];

    function CadastrarAlunoController ($window, $scope, $state, $translate, log_entity, LogDoSistema, Principal, aluno_entity, aluno_mestrado_entity, aluno_doutorado_entity, usuario_entity, user_entity, cpf_entity, rg_entity, titulo_entity, dispensa_entity, passaporte_entity, Aluno, AlunoMestrado, AlunoDoutorado, User, Usuario, DocumentoIdentificacao) {
        var vm = this;

        vm.clear = clear;
        vm.save = save;
        
        vm.alunomestrado = aluno_mestrado_entity;
        vm.alunodoutorado = aluno_doutorado_entity;
        vm.aluno = aluno_entity;
        vm.usuario = usuario_entity;
        vm.user = user_entity;
        vm.cpf = cpf_entity;
        vm.rg = rg_entity;
        vm.titulo = titulo_entity;
        vm.dispensa = dispensa_entity;
        vm.passaporte = passaporte_entity;
        vm.log = log_entity;

        function clear() {
        	$window.document.getElementById('cadastrar-aluno-type').selectedIndex = -1;
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
            vm.cpf = cpf_entity;
            vm.rg = rg_entity;
            vm.titulo = titulo_entity;
            vm.dispensa = dispensa_entity;
            vm.passaporte = passaporte_entity;
            vm.log = log_entity;
        }

        function save() {
            vm.isSaving = true;
            
            DocumentoIdentificacao.save(vm.cpf, function(){}, function(){}).$promise.then(function(cpf) {
                vm.usuario.cpfId = cpf.id;

                DocumentoIdentificacao.save(vm.rg, function(){}, function(){}).$promise.then(function(rg) {
                    vm.usuario.rgId = rg.id;

                    DocumentoIdentificacao.save(vm.titulo, function(){}, function(){}).$promise.then(function(titulo) {
                        vm.usuario.tituloDeEleitorId = titulo.id;

                        DocumentoIdentificacao.save(vm.dispensa, function(){}, function(){}).$promise.then(function(dispensa) {
                            vm.usuario.dispensaMilitarId = dispensa.id;

                            DocumentoIdentificacao.save(vm.passaporte, function(){}, function(){}).$promise.then(function(passaporte) {
                                vm.usuario.passaporteId = passaporte.id;

                                User.save(vm.user, function(){}, function(){}).$promise.then(function(user) {
                                    vm.usuario.systemUserId = user.id;

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
                                });
                            });
                        });
                    });
                });
            });
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            LogUseCase();
            $window.alert($translate.instant('cadastrar-aluno.alert.success'));
            vm.clear();
        }

        function onSaveError () {
            vm.isSaving = false;
            $window.alert($translate.instant('cadastrar-aluno.alert.failure'));
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
