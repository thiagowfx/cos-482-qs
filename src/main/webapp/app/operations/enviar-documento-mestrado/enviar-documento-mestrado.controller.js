(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EnviarDocumentoMestradoController', EnviarDocumentoMestradoController)
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
    
    EnviarDocumentoMestradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal', 'User', 'Usuario', 'Aluno', 'AlunoMestrado'];

    function EnviarDocumentoMestradoController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal, User, Usuario, Aluno, AlunoMestrado) {
        var vm = this;
        vm.userName;
        vm.userId;
        vm.usuarioId;
        vm.alunoId;
        vm.alunoMestrado;

        // for enviar-documento
        vm.saveDiplomaGraduacao = saveDiplomaGraduacao;
        vm.saveDeclaracaoConclusao = saveDeclaracaoConclusao;
        vm.saveCertidaoColacao = saveCertidaoColacao;
        vm.saveHistoricoGraduacao = saveHistoricoGraduacao;
        vm.saveCertidaoConclusao = saveCertidaoConclusao;


        // for remover-documento
        vm.deleteDeclaracaoConclusao = deleteDeclaracaoConclusao;
        vm.deleteHistoricoGraduacao = deleteHistoricoGraduacao;
        vm.deleteDiplomaGraduacao = deleteDiplomaGraduacao;
        vm.deleteCertidaoConclusao = deleteCertidaoConclusao; 
        vm.deleteCertidaoColacao = deleteCertidaoColacao; 

        vm.log = log_entity;

        loadAll();

        // Get alunoMestrado object
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

        AlunoMestrado.get(
            {alunoId: vm.alunoId},
            function (result) {
                vm.alunoMestrado = result;
            }
        );

        function loadAll() {
        }

        function saveDeclaracaoConclusao() {
            if($window.confirm($translate.instant('enviar-documento-mestrado.declaracao-conclusao.confirm'))){
                LogUseCase();
                vm.alunoMestrado.declaracaoConlcusao = vm.declaracaoConlcusao;
                vm.isSaving = true;
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
            }
        }

        function saveCertidaoColacao() {
            if($window.confirm($translate.instant('enviar-documento-mestrado.certidao-colacao.confirm'))){
                LogUseCase();
                vm.alunoMestrado.certidaoColacao = vm.certidaoColacao;
                vm.isSaving = true;
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
            }
        }

        function saveHistoricoGraduacao() {
            if($window.confirm($translate.instant('enviar-documento-mestrado.historico-graduacao.confirm'))){
                LogUseCase();
                vm.alunoMestrado.historicoGraduacao = vm.historicoGraduacao;
                vm.isSaving = true;
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
            }
        }

        function saveCertidaoConclusao() {
            if($window.confirm($translate.instant('enviar-documento-mestrado.certidao-conclusao.confirm'))){
                LogUseCase();
                vm.alunoMestrado.certidaoConclusao = vm.certidaoConclusao;
                vm.isSaving = true;
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
            }
        }

        function saveDiplomaGraduacao() {
            if($window.confirm($translate.instant('enviar-documento-mestrado.diploma-graduacao.confirm'))){
                LogUseCase();
                vm.alunoMestrado.diplomaGraduacao = vm.diplomaGraduacao;
                vm.isSaving = true;
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
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
        
        function deleteDeclaracaoConclusao() {}
        function deleteHistoricoGraduacao() {}
        function deleteDiplomaGraduacao() {}
        function deleteCertidaoConclusao() {}
        function deleteCertidaoColacao() {}

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
