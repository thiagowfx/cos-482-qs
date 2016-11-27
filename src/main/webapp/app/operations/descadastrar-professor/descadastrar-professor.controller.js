(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DescadastrarProfessorController', DescadastrarProfessorController);

    DescadastrarProfessorController.$inject = ['Principal', '$window', '$scope', '$state', '$translate', 'Professor', 'log_entity', 'LogDoSistema'];

    function DescadastrarProfessorController (Principal, $window, $scope, $state, $translate, Professor, log_entity, LogDoSistema) {
        var vm = this;

        vm.deleteProfessor = deleteProfessor;
        vm.professors = [];
        vm.log = log_entity;

        loadAll();

        function loadAll() {
            Professor.query(function(result) {
                vm.professors = result;
            });
        }

        function deleteProfessor(id) {
            if($window.confirm($translate.instant('descadastrar-professor.confirm'))) {
                Professor.delete({id: id},
                    function () {
                        LogUseCase();
                        $window.alert($translate.instant('descadastrar-professor.alert.success'));
                        $state.reload();
                    });
            }
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