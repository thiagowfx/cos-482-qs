(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('UsuarioDialogController', UsuarioDialogController);

    UsuarioDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Usuario', 'DocumentoIdentificacao', 'User'];

    function UsuarioDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Usuario, DocumentoIdentificacao, User) {
        var vm = this;

        vm.usuario = entity;
        vm.clear = clear;
        vm.save = save;
        vm.cpfs = DocumentoIdentificacao.query({filter: 'usuario-is-null'});
        $q.all([vm.usuario.$promise, vm.cpfs.$promise]).then(function() {
            if (!vm.usuario.cpfId) {
                return $q.reject();
            }
            return DocumentoIdentificacao.get({id : vm.usuario.cpfId}).$promise;
        }).then(function(cpf) {
            vm.cpfs.push(cpf);
        });
        vm.rgs = DocumentoIdentificacao.query({filter: 'usuario-is-null'});
        $q.all([vm.usuario.$promise, vm.rgs.$promise]).then(function() {
            if (!vm.usuario.rgId) {
                return $q.reject();
            }
            return DocumentoIdentificacao.get({id : vm.usuario.rgId}).$promise;
        }).then(function(rg) {
            vm.rgs.push(rg);
        });
        vm.titulodeeleitors = DocumentoIdentificacao.query({filter: 'usuario-is-null'});
        $q.all([vm.usuario.$promise, vm.titulodeeleitors.$promise]).then(function() {
            if (!vm.usuario.tituloDeEleitorId) {
                return $q.reject();
            }
            return DocumentoIdentificacao.get({id : vm.usuario.tituloDeEleitorId}).$promise;
        }).then(function(tituloDeEleitor) {
            vm.titulodeeleitors.push(tituloDeEleitor);
        });
        vm.dispensamilitars = DocumentoIdentificacao.query({filter: 'usuario-is-null'});
        $q.all([vm.usuario.$promise, vm.dispensamilitars.$promise]).then(function() {
            if (!vm.usuario.dispensaMilitarId) {
                return $q.reject();
            }
            return DocumentoIdentificacao.get({id : vm.usuario.dispensaMilitarId}).$promise;
        }).then(function(dispensaMilitar) {
            vm.dispensamilitars.push(dispensaMilitar);
        });
        vm.passaportes = DocumentoIdentificacao.query({filter: 'usuario-is-null'});
        $q.all([vm.usuario.$promise, vm.passaportes.$promise]).then(function() {
            if (!vm.usuario.passaporteId) {
                return $q.reject();
            }
            return DocumentoIdentificacao.get({id : vm.usuario.passaporteId}).$promise;
        }).then(function(passaporte) {
            vm.passaportes.push(passaporte);
        });
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.usuario.id !== null) {
                Usuario.update(vm.usuario, onSaveSuccess, onSaveError);
            } else {
                Usuario.save(vm.usuario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('cos482App:usuarioUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
