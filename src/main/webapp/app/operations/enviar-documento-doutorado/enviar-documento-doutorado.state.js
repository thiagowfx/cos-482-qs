(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('enviar-documento-doutorado', {
            parent: 'operations',
            url: '/enviar-documento-doutorado',
            data: {
                authorities: ['ROLE_ALUNO_DOUTORADO'],
                pageTitle: 'global.menu.operations.enviar_documento_doutorado'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/enviar-documento-doutorado/enviar-documento-doutorado.html',
                    controller: 'EnviarDocumentoDoutoradoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('enviar-documento-doutorado');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 12,
                        username: null
                    };
                }
            }
        });
    }
})();
