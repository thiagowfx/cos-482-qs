(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarProfessorController', CadastrarProfessorController);

    CadastrarProfessorController.$inject = ['$window', '$scope', '$state', 'Professor'];

    function CadastrarProfessorController ($window, $scope, $state, Professor) {
        var vm = this;

        // vm.professor = entity;
        vm.clear = clear;
        vm.save = save;

        function clear() {
            // $window.document.getElementById('cadastrar-professor-name').value = "";
            // $window.document.getElementById('cadastrar-professor-siape').value = "";
        }

        function save() {
            console.log('save');
            vm.isSaving = true;
            Professor.save(vm.professor, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            console.log('onSaveSuccess');
            // $scope.$emit('cos482App:professorUpdate', result);
            vm.isSaving = false;
        }

        function onSaveError () {
            console.log('onSaveError');
            vm.isSaving = false;
        }
    }
})();
