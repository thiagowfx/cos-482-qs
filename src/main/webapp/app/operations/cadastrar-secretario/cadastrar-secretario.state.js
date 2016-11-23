(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cadastrar-secretario', {
            parent: 'operations',
            url: '/cadastrar-secretario',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.cadastrar_secretario'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/cadastrar-secretario/cadastrar-secretario.html',
                    controller: 'CadastrarSecretarioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('cadastrar-secretario');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                secretario_entity: function () {
                    return {
                        id: null
                    };
                },
                usuario_entity: function () {
                    return {
                        id: null
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
