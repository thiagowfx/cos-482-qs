(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('ProfessorDetailController', ProfessorDetailController);

    ProfessorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Professor'];

    function ProfessorDetailController($scope, $rootScope, $stateParams, previousState, entity, Professor) {
        var vm = this;

        vm.professor = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('cos482App:professorUpdate', function(event, result) {
            vm.professor = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
