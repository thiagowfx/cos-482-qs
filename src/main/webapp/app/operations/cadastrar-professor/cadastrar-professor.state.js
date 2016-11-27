(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cadastrar-professor', {
            parent: 'operations',
            url: '/cadastrar-professor',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.cadastrar_professor'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/cadastrar-professor/cadastrar-professor.html',
                    controller: 'CadastrarProfessorController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('cadastrar-professor');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                professor_entity: function () {
                    return {
                        nome: null,
                        siape: null,
                        id: null
                    };
                },
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: null,
                        username: null
                    };
                }
            }
        });
    }
})();
