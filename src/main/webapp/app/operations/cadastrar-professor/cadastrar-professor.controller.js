(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarProfessorController', CadastrarProfessorController);

    CadastrarProfessorController.$inject = ['$scope', '$state', 'Professor'];

    function CadastrarProfessorController ($scope, $state, Professor) {
    }
})();
