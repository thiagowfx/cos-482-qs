(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EmitirDiplomaController', EmitirDiplomaController);

    EmitirDiplomaController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal'];

    function EmitirDiplomaController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal) {
        var vm = this;

        vm.log = log_entity;

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
