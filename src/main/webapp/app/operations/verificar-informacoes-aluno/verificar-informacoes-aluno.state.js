(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('verificar-informacoes-aluno', {
            parent: 'operations',
            url: '/verificar-informacoes-aluno',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.verificar_informacoes_aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/verificar-informacoes-aluno/verificar-informacoes-aluno.html',
                    controller: 'VerificarInformacoesAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('verificar-informacoes-aluno');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 8,
                        username: null
                    };
                }
            }
        })
        .state('verificar-informacoes-aluno-detail', {
            parent: 'verificar-informacoes-aluno',
            url: '/verificar-informacoes-aluno/{id}',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'verificar-informacoes-aluno.secretario'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/verificar-informacoes-aluno/verificar-informacoes-aluno-detail.html',
                    controller: 'VerificarInformacoesAlunoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('verificar-informacoes-aluno');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Aluno', 'Usuario', 'DocumentoIdentificacao',  function($stateParams, Aluno, Usuario, DocumentoIdentificacao) {
                    return Aluno.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'verificar-informacoes-aluno',
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
        })
        ;
    }
})();
