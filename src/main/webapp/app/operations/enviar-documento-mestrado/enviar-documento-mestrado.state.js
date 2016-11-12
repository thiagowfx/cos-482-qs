(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('enviar-documento-mestrado', {
            parent: 'operations',
            url: '/enviar-documento-mestrado',
            data: {
                authorities: ['ROLE_ALUNO_MESTRADO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/enviar-documento-mestrado/enviar-documento-mestrado.html',
                    controller: 'EnviarDocumentoMestradoController',
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
