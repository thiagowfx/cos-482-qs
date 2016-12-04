(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaController', EmitirDiplomaController);

    EmitirDiplomaController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'Usuario', 'Aluno'];

    function EmitirDiplomaController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, Usuario, Aluno) {
        var vm = this;

        vm.allAlunos = [];
        vm.alunos = [];
        vm.usuarios = [];

        vm.log = log_entity;

        vm.concludeMatricula = concludeMatricula;

        loadAll();

        function loadAll() {

            // select alunos with matricula=ATIVA
            Aluno.query(
                {matricula: "ATIVA"},
                function(result) {
                vm.allAlunos = result;

                for (var i = 0; i < vm.allAlunos.length; i++) {
                    (function(i) {
                        Usuario.get(
                            {id: vm.allAlunos[i].usuarioId},
                            function (result) {

                                if(result.conta == "ATIVA")
                                {
                                    vm.allAlunos[i].usuario = result;
                                    vm.allAlunos[i].indexOnArray = vm.alunos.length;
                                    vm.alunos.push(vm.allAlunos[i]);                                    
                                }

                            }
                        );
                    })(i);
                }

            });
        }

        function concludeMatricula(id) {
            if($window.confirm($translate.instant('emitir-diploma.confirm'))){
                LogUseCase();
                vm.alunos[id].aluno.matricula = "COMPLETADA";
                vm.isSaving = true;
                Aluno.update(vm.alunos[id].aluno, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('emitir-diploma.alert.success'));
            vm.isSaving = false;
            $state.reload();
        }

        function onSaveError () {
            $window.alert($translate.instant('emitir-diploma.alert.error'));
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
