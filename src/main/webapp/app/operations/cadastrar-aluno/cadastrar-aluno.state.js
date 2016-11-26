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
                authorities: ['ROLE_SECRETARIO_ACADEMICO']
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
                    $translatePartialLoader.addPart('cadastrar-aluno');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                aluno_entity: function () {
                    return {
                        id: null
                    };
                },
                usuario_entity: function () {
                    return {
                        id: null,
                        nome: null
                    };
                },
                user_entity: function () {
                    return {
                        id: null
                    }
                }
                // TODO: complete all three entities
            }
        });
    }
})();
