(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('SecretarioAcademicoDetailController', SecretarioAcademicoDetailController);

    SecretarioAcademicoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SecretarioAcademico', 'Usuario'];

    function SecretarioAcademicoDetailController($scope, $rootScope, $stateParams, previousState, entity, SecretarioAcademico, Usuario) {
        var vm = this;

        vm.secretarioAcademico = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:secretarioAcademicoUpdate', function(event, result) {
            vm.secretarioAcademico = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
