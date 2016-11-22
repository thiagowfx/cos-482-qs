(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarProfessorController', DescadastrarProfessorController);

    DescadastrarProfessorController.$inject = ['$window', '$scope', '$state', '$translate', 'Professor'];

    function DescadastrarProfessorController ($window, $scope, $state, $translate, Professor) {
        var vm = this;

        vm.deleteProfessor = deleteProfessor;
        vm.professors = [];

        loadAll();

        function loadAll() {
            Professor.query(function(result) {
                vm.professors = result;
            });
        }

        function deleteProfessor(id) {
            Professor.delete({id: id},
                function () {
                    $window.alert($translate.instant('descadastrar-professor.alert.success'));
                });
        }
    }
})();