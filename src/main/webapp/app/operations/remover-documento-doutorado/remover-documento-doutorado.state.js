(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('remover-documento-doutorado', {
            parent: 'operations',
            url: '/remover-documento-doutorado',
            data: {
                authorities: ['ROLE_ALUNO_DOUTORADO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/remover-documento-doutorado/remover-documento-doutorado.html',
                    controller: 'RemoverDocumentoDoutoradoController',
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
