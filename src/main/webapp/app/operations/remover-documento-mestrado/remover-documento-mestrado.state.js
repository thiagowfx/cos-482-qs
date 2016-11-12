(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('remover-documento-mestrado', {
            parent: 'operations',
            url: '/remover-documento-mestrado',
            data: {
                authorities: ['ROLE_ALUNO_MESTRADO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/remover-documento-mestrado/remover-documento-mestrado.html',
                    controller: 'RemoverDocumentoMestradoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
