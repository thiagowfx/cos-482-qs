(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDialogController', AlunoDialogController);

    AlunoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Aluno', 'DocumentoSistema', 'Usuario', 'Professor'];

    function AlunoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Aluno, DocumentoSistema, Usuario, Professor) {
        var vm = this;

        vm.aluno = entity;
        vm.clear = clear;
        vm.save = save;
        vm.declaracaoconclusaos = DocumentoSistema.query({filter: 'aluno-is-null'});
        $q.all([vm.aluno.$promise, vm.declaracaoconclusaos.$promise]).then(function() {
            if (!vm.aluno.declaracaoConclusaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.aluno.declaracaoConclusaoId}).$promise;
        }).then(function(declaracaoConclusao) {
            vm.declaracaoconclusaos.push(declaracaoConclusao);
        });
        vm.historicogradaucaos = DocumentoSistema.query({filter: 'aluno-is-null'});
        $q.all([vm.aluno.$promise, vm.historicogradaucaos.$promise]).then(function() {
            if (!vm.aluno.historicoGradaucaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.aluno.historicoGradaucaoId}).$promise;
        }).then(function(historicoGradaucao) {
            vm.historicogradaucaos.push(historicoGradaucao);
        });
        vm.usuarios = Usuario.query();
        vm.professors = Professor.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.aluno.id !== null) {
                Aluno.update(vm.aluno, onSaveSuccess, onSaveError);
            } else {
                Aluno.save(vm.aluno, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:alunoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
