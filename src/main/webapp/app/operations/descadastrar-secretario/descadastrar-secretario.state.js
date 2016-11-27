(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('descadastrar-secretario', {
            parent: 'operations',
            url: '/descadastrar-secretario',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.descadastrar_secretario'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-secretario/descadastrar-secretario.html',
                    controller: 'DescadastrarSecretarioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('descadastrar-secretario');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 5,
                        username: null
                    };
                }
            }
        })
        .state('descadastrar-secretario-detail', {
            parent: 'descadastrar-secretario',
            url: '/descadastrar-secretario/{id}',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'descadastrar-secretario.secretario'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-secretario/descadastrar-secretario-detail.html',
                    controller: 'DescadastrarSecretarioDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('descadastrar-secretario');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SecretarioAcademico', 'Usuario', 'DocumentoIdentificacao',  function($stateParams, SecretarioAcademico, Usuario, DocumentoIdentificacao) {
                    return SecretarioAcademico.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'descadastrar-secretario',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 5,
                        username: null
                    };
                }
            }
        });
    }
})();
