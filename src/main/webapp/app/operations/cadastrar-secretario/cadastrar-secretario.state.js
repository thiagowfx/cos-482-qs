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
                        id: null,
                        usuarioId: null
                    };
                },
                usuario_entity: function () {
                    return {
                        id: null,
                        nome: null,
                        // TODO: conta,
                        cpfId: null,
                        rgId: null,
                        // TODO: tituloDeEleitorId
                        passaporteId: null
                        // TODO: system_user_id
                    };
                },
                user_entity: function () {
                    return {
                        id: null
                        // TODOs
                    }
                },
                cpf_entity: function () {
                    return {
                        id: null,
                        tipo: "CPF",
                        valor: null
                    }
                },
                rg_entity: function () {
                    return {
                        id: null,
                        tipo: "RG",
                        valor: null
                    }
                }
            }
        });
    }
})();
