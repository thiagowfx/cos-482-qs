(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EnviarDocumentoDoutoradoController', EnviarDocumentoDoutoradoController)
        .directive("fileread", [function () {
            return {
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                        });
                    });
                }
            }
        }]);       
    
    EnviarDocumentoDoutoradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal', 'User', 'Usuario', 'Aluno', 'AlunoDoutorado'];

    function EnviarDocumentoDoutoradoController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal, User, Usuario, Aluno, AlunoDoutorado) {
        var vm = this;
        vm.userName;
        vm.userId;
        vm.usuarioId;
        vm.alunoId;
        vm.alunoDoutoradoId;

        // for enviar-documento
        vm.saveDiplomaMestrado = saveDiplomaMestrado;
        vm.saveAtaColacao = saveAtaColacao;
        vm.saveCertidaoConclusao = saveCertidaoConclusao;


        // for remover-documento
        vm.deleteDiplomaMestrado = deleteDiplomaMestrado;
        vm.deleteCertidaoConclusao = deleteCertidaoConclusao; 
        vm.deleteAtaColacao = deleteAtaColacao; 

        vm.log = log_entity;

        loadAll();

        // Get alunoDoutorado object
        Principal.identity().then(function(account) {
            vm.userName = account;
        });
        
        User.get( 
            {login: vm.userName},
            function (result) {
                vm.userId = result.usuarioId;
            } 
        );
        
        Usuario.get(
            {userId: vm.userId},
            function (result) {
                vm.usuarioId = result.id;
            }
        );
        Aluno.get(
            {usuarioId: vm.usuarioId},
            function (result) {
                vm.alunoId = result.id;
            }            
        );

        AlunoDoutorado.get(
            {alunoId: vm.alunoId},
            function (result) {
                vm.alunoDoutorado = result;
            }
        );

        function loadAll() {
        }

        function saveAtaColacao() {
            if($window.confirm($translate.instant('enviar-documento-doutorado-ata-colacao.confirm'))){
                LogUseCase();
                vm.alunoDoutorado.ataColacao = vm.ataColacao;
                vm.isSaving = true;
                AlunoDoutorado.update(vm.alunoDoutorado, onSaveSuccess, onSaveError);
            }
        }

        function saveCertidaoConclusao() {
            if($window.confirm($translate.instant('enviar-documento-doutorado.certidao-conclusao.confirm'))){
                LogUseCase();
                vm.alunoDoutorado.certidaoConclusao = vm.certidaoConclusao;
                vm.isSaving = true;
                AlunoDoutorado.update(vm.alunoDoutorado, onSaveSuccess, onSaveError);
            }
        }

        function saveDiplomaMestrado() {
            if($window.confirm($translate.instant('enviar-documento-doutorado.diploma-mestrado.confirm'))){
                LogUseCase();
                vm.alunoDoutorado.diplomaMestrado = vm.diplomaMestrado;
                vm.isSaving = true;
                AlunoDoutorado.update(vm.alunoDoutorado, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $window.alert($translate.instant('enviar-documento-doutorado.alert.success'));
            vm.isSaving = false;
            $state.go(vm.previousState);
        }

        function onSaveError () {
            $window.alert($translate.instant('enviar-documento-doutorado.alert.error'));
            vm.isSaving = false;
            $state.go(vm.previousState);
        }

        function deleteDiplomaMestrado() {}
        function deleteCertidaoConclusao() {}
        function deleteAtaColacao() {}

        // TODO: clear function + clear button
        // TODO: ng-hide + check if null


        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
