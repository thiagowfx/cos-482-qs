(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('enviar-documento-mestrado', {
            parent: 'operations',
            url: '/enviar-documento-mestrado',
            data: {
                authorities: ['ROLE_ALUNO_MESTRADO'],
                pageTitle: 'global.menu.operations.enviar_documento_mestrado'
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
                    $translatePartialLoader.addPart('enviar-documento-mestrado');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 10,
                        username: null
                    };
                }
            }
        });
    }
})();
