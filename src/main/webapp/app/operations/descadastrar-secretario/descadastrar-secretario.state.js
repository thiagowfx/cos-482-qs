(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('descadastrar-secretario', {
            parent: 'operations',
            url: '/descadastrar-secretario',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-secretario/descadastrar-secretario.html',
                    //controller: 'DescadastrarSecretarioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('descadastrar-secretario');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
