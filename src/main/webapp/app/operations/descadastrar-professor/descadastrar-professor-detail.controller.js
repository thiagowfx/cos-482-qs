(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarProfessorDetailController', DescadastrarProfessorDetailController);

    DescadastrarProfessorDetailController.$inject = ['$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'entity', 'Professor'];

    function DescadastrarProfessorDetailController($window, $scope, $state, $translate, $rootScope, $stateParams, previousState, entity, Professor) {
        var vm = this;

        vm.professor = entity;
        vm.previousState = previousState.name;
        vm.deleteProfessor = deleteProfessor;

        function deleteProfessor(id) {
            Professor.delete({id: id},
                function () {
                    $window.alert($translate.instant('descadastrar-professor.alert.success'));
                    $state.go('^');
                });
        }
    }
})();
