(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarProfessorDetailController', DescadastrarProfessorDetailController);

    DescadastrarProfessorDetailController.$inject = ['Principal', '$window', '$scope', '$state', '$translate', '$rootScope', '$stateParams', 'previousState', 'professor_entity', 'Professor', 'log_entity', 'LogDoSistema'];

    function DescadastrarProfessorDetailController(Principal, $window, $scope, $state, $translate, $rootScope, $stateParams, previousState, professor_entity, Professor, log_entity, LogDoSistema) {
        var vm = this;

        vm.professor = professor_entity;
        vm.previousState = previousState.name;
        vm.deleteProfessor = deleteProfessor;
        vm.log = log_entity;

        function deleteProfessor(id) {
            Professor.delete({id: id},
                function () {
                    LogUseCase();
                    $window.alert($translate.instant('descadastrar-professor.alert.success'));
                    $state.go('^');
                });
        }

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                vm.log.funcao = 3;
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
