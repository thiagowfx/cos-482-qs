(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('descadastrar-aluno', {
            parent: 'operations',
            url: '/descadastrar-aluno',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.descadastrar_aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-aluno/descadastrar-aluno.html',
                    controller: 'DescadastrarAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('descadastrar-aluno');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 6,
                        username: null
                    };
                }
            }
        })
        .state('descadastrar-aluno-detail', {
            parent: 'descadastrar-aluno',
            url: '/descadastrar-aluno/{id}',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'descadastrar-aluno.aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-aluno/descadastrar-aluno-detail.html',
                    controller: 'DescadastrarAlunoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('descadastrar-aluno');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Aluno', 'Usuario', 'DocumentoIdentificacao',  function($stateParams, Aluno, Usuario, DocumentoIdentificacao) {
                    return Aluno.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'descadastrar-aluno',
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
