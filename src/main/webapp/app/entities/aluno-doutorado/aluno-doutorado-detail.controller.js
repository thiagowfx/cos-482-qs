(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDoutoradoDetailController', AlunoDoutoradoDetailController);

    AlunoDoutoradoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AlunoDoutorado', 'DocumentoSistema', 'Aluno'];

    function AlunoDoutoradoDetailController($scope, $rootScope, $stateParams, previousState, entity, AlunoDoutorado, DocumentoSistema, Aluno) {
        var vm = this;

        vm.alunoDoutorado = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:alunoDoutoradoUpdate', function(event, result) {
            vm.alunoDoutorado = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
