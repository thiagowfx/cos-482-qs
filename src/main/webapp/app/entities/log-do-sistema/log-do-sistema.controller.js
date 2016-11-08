(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('LogDoSistemaController', LogDoSistemaController);

    LogDoSistemaController.$inject = ['$scope', '$state', 'LogDoSistema'];

    function LogDoSistemaController ($scope, $state, LogDoSistema) {
        var vm = this;
        
        vm.logDoSistemas = [];

        loadAll();

        function loadAll() {
            LogDoSistema.query(function(result) {
                vm.logDoSistemas = result;
            });
        }
    }
})();
