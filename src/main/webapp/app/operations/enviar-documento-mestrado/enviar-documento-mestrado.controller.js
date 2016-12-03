(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EnviarDocumentoMestradoController', EnviarDocumentoMestradoController);

    EnviarDocumentoMestradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal'];

    function EnviarDocumentoMestradoController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal) {
        var vm = this;

        vm.log = log_entity;

        function saveDiplomaGraduacao() {
            // TODO
            // console.log("diploma graduacao");
            // console.log(vm.q);
        }

        // TODO: clear function + clear button
        // TODO: acquire string text from file picker/chooser via angular
        // TODO: ng-hide + check if null

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
