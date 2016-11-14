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
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/verificar-informacoes-aluno/verificar-informacoes-aluno.html',
                    //controller: 'VerificarInformacoesAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('verificar-informacoes');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
