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
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
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
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
