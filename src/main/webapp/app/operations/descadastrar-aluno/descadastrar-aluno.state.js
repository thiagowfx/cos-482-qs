(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('descadastrar-aluno', {
            parent: 'operations',
            url: '/descadastrar-aluno',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-aluno/descadastrar-aluno.html',
                    //controller: 'DescadastrarAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('descadastrar-aluno');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
