(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoIdentificacaoDialogController', DocumentoIdentificacaoDialogController);

    DocumentoIdentificacaoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'DocumentoIdentificacao'];

    function DocumentoIdentificacaoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, DocumentoIdentificacao) {
        var vm = this;

        vm.documentoIdentificacao = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.documentoIdentificacao.id !== null) {
                DocumentoIdentificacao.update(vm.documentoIdentificacao, onSaveSuccess, onSaveError);
            } else {
                DocumentoIdentificacao.save(vm.documentoIdentificacao, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:documentoIdentificacaoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
