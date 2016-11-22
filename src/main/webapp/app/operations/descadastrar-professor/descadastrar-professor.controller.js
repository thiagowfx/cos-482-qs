(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarProfessorController', DescadastrarProfessorController);

    DescadastrarProfessorController.$inject = ['$scope', '$state', 'Professor'];

    function DescadastrarProfessorController ($scope, $state, Professor) {
        var vm = this;

        vm.professors = [];

        loadAll();

        function loadAll() {
            Professor.query(function(result) {
                vm.professors = result;
            });
        }
    }
})();