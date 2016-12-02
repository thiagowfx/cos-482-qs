(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('verificar-informacoes-aluno', {
            parent: 'operations',
            url: '/verificar-informacoes-aluno',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.verificar_informacoes_aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/verificar-informacoes-aluno/verificar-informacoes-aluno.html',
                    controller: 'VerificarInformacoesAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('verificar-informacoes-aluno');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 8,
                        username: null
                    };
                }
            }
        });
    }
})();
