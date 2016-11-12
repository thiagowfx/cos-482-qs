(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cadastrar-aluno', {
            parent: 'operations',
            url: '/cadastrar-aluno',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/cadastrar-aluno/cadastrar-aluno.html',
                    controller: 'CadastrarAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
