(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoController', AlunoController);

    AlunoController.$inject = ['$scope', '$state', 'Aluno'];

    function AlunoController ($scope, $state, Aluno) {
        var vm = this;
        
        vm.alunos = [];

        loadAll();

        function loadAll() {
            Aluno.query(function(result) {
                vm.alunos = result;
            });
        }
    }
})();
