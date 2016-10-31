(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoMestradoDialogController', AlunoMestradoDialogController);

    AlunoMestradoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'AlunoMestrado', 'DocumentoSistema', 'Aluno'];

    function AlunoMestradoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, AlunoMestrado, DocumentoSistema, Aluno) {
        var vm = this;

        vm.alunoMestrado = entity;
        vm.clear = clear;
        vm.save = save;
        vm.diplomagraduacaos = DocumentoSistema.query({filter: 'alunomestrado-is-null'});
        $q.all([vm.alunoMestrado.$promise, vm.diplomagraduacaos.$promise]).then(function() {
            if (!vm.alunoMestrado.diplomaGraduacaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoMestrado.diplomaGraduacaoId}).$promise;
        }).then(function(diplomaGraduacao) {
            vm.diplomagraduacaos.push(diplomaGraduacao);
        });
        vm.certidadoconclusaos = DocumentoSistema.query({filter: 'alunomestrado-is-null'});
        $q.all([vm.alunoMestrado.$promise, vm.certidadoconclusaos.$promise]).then(function() {
            if (!vm.alunoMestrado.certidadoConclusaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoMestrado.certidadoConclusaoId}).$promise;
        }).then(function(certidadoConclusao) {
            vm.certidadoconclusaos.push(certidadoConclusao);
        });
        vm.certidaocolacaos = DocumentoSistema.query({filter: 'alunomestrado-is-null'});
        $q.all([vm.alunoMestrado.$promise, vm.certidaocolacaos.$promise]).then(function() {
            if (!vm.alunoMestrado.certidaoColacaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoMestrado.certidaoColacaoId}).$promise;
        }).then(function(certidaoColacao) {
            vm.certidaocolacaos.push(certidaoColacao);
        });
        vm.alunos = Aluno.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.alunoMestrado.id !== null) {
                AlunoMestrado.update(vm.alunoMestrado, onSaveSuccess, onSaveError);
            } else {
                AlunoMestrado.save(vm.alunoMestrado, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:alunoMestradoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
