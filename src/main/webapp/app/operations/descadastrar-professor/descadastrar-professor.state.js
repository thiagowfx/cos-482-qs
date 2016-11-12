(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('descadastrar-professor', {
            parent: 'operations',
            url: '/descadastrar-professor',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-professor/descadastrar-professor.html',
                    controller: 'DescadastrarProfessorController',
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
