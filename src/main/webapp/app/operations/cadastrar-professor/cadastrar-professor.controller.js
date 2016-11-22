(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('CadastrarProfessorController', CadastrarProfessorController);

    CadastrarProfessorController.$inject = ['$window', '$scope', '$state', 'entity', 'Professor'];

    function CadastrarProfessorController ($window, $scope, $state, entity, Professor) {
        var vm = this;

        vm.professor = entity;
        vm.clear = clear;
        vm.save = save;
        vm.isValid = isValid;

        function clear() {
            $window.document.getElementById('cadastrar-professor-name').value = "";
            $window.document.getElementById('cadastrar-professor-siape').value = "";
        }

        function save() {
            console.log(isValid(getProfessorFromForm()));

            vm.isSaving = true;
            Professor.save(vm.professor, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            clear();
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        function getProfessorFromForm() {
            return {
                "nome": $window.document.getElementById('cadastrar-professor-name').value,
                "siape": $window.document.getElementById('cadastrar-professor-siape').value
            };
        }

        function isValid(professor) {
            return professor.nome.length > 0 && professor.siape.length > 0;
        }
    }
})();
