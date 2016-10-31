(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('UsuarioDetailController', UsuarioDetailController);

    UsuarioDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Usuario', 'DocumentoIdentificacao', 'User'];

    function UsuarioDetailController($scope, $rootScope, $stateParams, previousState, entity, Usuario, DocumentoIdentificacao, User) {
        var vm = this;

        vm.usuario = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:usuarioUpdate', function(event, result) {
            vm.usuario = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
