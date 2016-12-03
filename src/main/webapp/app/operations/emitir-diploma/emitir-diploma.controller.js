(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaController', EmitirDiplomaController);

    EmitirDiplomaController.$inject = ['Principal', 'log_entity', 'LogDoSistema', '$window', '$scope', '$state', '$translate', 'Aluno'];

    function EmitirDiplomaController (Principal, log_entity, LogDoSistema, $window, $scope, $state, $translate, Aluno) {
        var vm = this;

        vm.alunos = [];
        //vm.alunosMestrado = [];
        //vm.alunosDoutorado = [];

        loadAll();

        function loadAll() {            
            Aluno.query(function(result) {
                vm.alunos = result;
                console.log(vm.alunos);
            // }),
            // AlunoMestrado.query(function(result) {
            //     vm.alunosMestrado = result;
            //     console.log(vm.alunos);
            // }),
            // AlunoDoutorado.query(function(result) {
            //     vm.alunosDoutorado = result;
            //     console.log(vm.alunos);
            });            
        }

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
