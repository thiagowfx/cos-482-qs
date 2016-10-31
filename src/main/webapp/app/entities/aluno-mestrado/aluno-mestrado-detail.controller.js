(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoMestradoDetailController', AlunoMestradoDetailController);

    AlunoMestradoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AlunoMestrado', 'DocumentoSistema', 'Aluno'];

    function AlunoMestradoDetailController($scope, $rootScope, $stateParams, previousState, entity, AlunoMestrado, DocumentoSistema, Aluno) {
        var vm = this;

        vm.alunoMestrado = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:alunoMestradoUpdate', function(event, result) {
            vm.alunoMestrado = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
