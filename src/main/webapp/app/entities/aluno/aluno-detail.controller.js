(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDetailController', AlunoDetailController);

    AlunoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Aluno', 'DocumentoSistema', 'Usuario', 'Professor'];

    function AlunoDetailController($scope, $rootScope, $stateParams, previousState, entity, Aluno, DocumentoSistema, Usuario, Professor) {
        var vm = this;

        vm.aluno = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:alunoUpdate', function(event, result) {
            vm.aluno = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
