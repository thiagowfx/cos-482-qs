(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoMestradoController', AlunoMestradoController);

    AlunoMestradoController.$inject = ['$scope', '$state', 'AlunoMestrado'];

    function AlunoMestradoController ($scope, $state, AlunoMestrado) {
        var vm = this;
        
        vm.alunoMestrados = [];

        loadAll();

        function loadAll() {
            AlunoMestrado.query(function(result) {
                vm.alunoMestrados = result;
            });
        }
    }
})();
