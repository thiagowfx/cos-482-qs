(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('AlunoDoutoradoController', AlunoDoutoradoController);

    AlunoDoutoradoController.$inject = ['$scope', '$state', 'AlunoDoutorado'];

    function AlunoDoutoradoController ($scope, $state, AlunoDoutorado) {
        var vm = this;
        
        vm.alunoDoutorados = [];

        loadAll();

        function loadAll() {
            AlunoDoutorado.query(function(result) {
                vm.alunoDoutorados = result;
            });
        }
    }
})();
