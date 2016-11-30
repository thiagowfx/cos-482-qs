(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('VerificarInformacoesAlunoController', VerificarInformacoesAlunoController);

    VerificarInformacoesAlunoController.$inject = ['Principal', '$window', '$scope', '$state', '$translate', 'Aluno'];

    function VerificarInformacoesAlunoController (Principal, $window, $scope, $state, $translate, Aluno) {
        var vm = this;
        
        vm.alunos = [];

        loadAll();

        function loadAll() {
            Aluno.query(function(result) {
                vm.alunos = result;
                console.log(vm.alunos);
            });
        }
    }
})();
