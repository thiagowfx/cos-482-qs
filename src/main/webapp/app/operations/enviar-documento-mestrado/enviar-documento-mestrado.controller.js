(function() {
    'use strict';

    angular
        .module('cos482App')
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                        });
                    });
                }
            }
        }])
        .controller('EnviarDocumentoMestradoController', EnviarDocumentoMestradoController);

    EnviarDocumentoMestradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal'];

    function EnviarDocumentoMestradoController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal) {
        var vm = this;

        vm.saveDiplomaGraduacao = saveDiplomaGraduacao;
        vm.log = log_entity;

        function saveDiplomaGraduacao() {
            console.log(vm.diplomaGraduacao);
            console.log(vm.diplomaGraduacao.name);
        }

        // TODO: clear function + clear button
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
