(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('validar-documento', {
            parent: 'operations',
            url: '/validar-documento',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/validar-documento/validar-documento.html',
                    controller: 'ValidarDocumentoController',
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
