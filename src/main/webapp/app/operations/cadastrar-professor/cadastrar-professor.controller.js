(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarProfessorController', CadastrarProfessorController);

    CadastrarProfessorController.$inject = ['$window', '$scope', '$state', 'Professor'];

    function CadastrarProfessorController ($window, $scope, $state, Professor) {
        var vm = this;

        vm.clear = clear;

        function clear() {
            // $window.document.getElementById('cadastrar-professor-name').value = "";
            // $window.document.getElementById('cadastrar-professor-siape').value = "";
        }
    }
})();
