(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('SecretarioAcademicoController', SecretarioAcademicoController);

    SecretarioAcademicoController.$inject = ['$scope', '$state', 'SecretarioAcademico'];

    function SecretarioAcademicoController ($scope, $state, SecretarioAcademico) {
        var vm = this;
        
        vm.secretarioAcademicos = [];

        loadAll();

        function loadAll() {
            SecretarioAcademico.query(function(result) {
                vm.secretarioAcademicos = result;
            });
        }
    }
})();
