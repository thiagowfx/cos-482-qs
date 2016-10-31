(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDoutoradoDialogController', AlunoDoutoradoDialogController);

    AlunoDoutoradoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'AlunoDoutorado', 'DocumentoSistema', 'Aluno'];

    function AlunoDoutoradoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, AlunoDoutorado, DocumentoSistema, Aluno) {
        var vm = this;

        vm.alunoDoutorado = entity;
        vm.clear = clear;
        vm.save = save;
        vm.atadissertacaos = DocumentoSistema.query({filter: 'alunodoutorado-is-null'});
        $q.all([vm.alunoDoutorado.$promise, vm.atadissertacaos.$promise]).then(function() {
            if (!vm.alunoDoutorado.ataDissertacaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoDoutorado.ataDissertacaoId}).$promise;
        }).then(function(ataDissertacao) {
            vm.atadissertacaos.push(ataDissertacao);
        });
        vm.certidaoconclusaos = DocumentoSistema.query({filter: 'alunodoutorado-is-null'});
        $q.all([vm.alunoDoutorado.$promise, vm.certidaoconclusaos.$promise]).then(function() {
            if (!vm.alunoDoutorado.certidaoConclusaoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoDoutorado.certidaoConclusaoId}).$promise;
        }).then(function(certidaoConclusao) {
            vm.certidaoconclusaos.push(certidaoConclusao);
        });
        vm.diplomamestrados = DocumentoSistema.query({filter: 'alunodoutorado-is-null'});
        $q.all([vm.alunoDoutorado.$promise, vm.diplomamestrados.$promise]).then(function() {
            if (!vm.alunoDoutorado.diplomaMestradoId) {
                return $q.reject();
            }
            return DocumentoSistema.get({id : vm.alunoDoutorado.diplomaMestradoId}).$promise;
        }).then(function(diplomaMestrado) {
            vm.diplomamestrados.push(diplomaMestrado);
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
            if (vm.alunoDoutorado.id !== null) {
                AlunoDoutorado.update(vm.alunoDoutorado, onSaveSuccess, onSaveError);
            } else {
                AlunoDoutorado.save(vm.alunoDoutorado, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:alunoDoutoradoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
