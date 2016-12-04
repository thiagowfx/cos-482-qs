(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('emitir-diploma', {
            parent: 'operations',
            url: '/emitir-diploma',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.emitir_diploma'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/emitir-diploma/emitir-diploma.html',
                    controller: 'EmitirDiplomaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('emitir-diploma');
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
        .state('emitir-diploma-detail', {
            parent: 'emitir-diploma',
            url: '/emitir-diploma/{id}',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'emitir-diploma.aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/emitir-diploma/emitir-diploma-detail.html',
                    controller: 'EmitirDiplomaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('emitir-diploma');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Aluno', 'Usuario',  function($stateParams, Aluno, Usuario) {
                    return Aluno.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'emitir-diploma',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }],
                log_entity: function () {
                    return {
                        id: null,
                        timestampFuncao: null,
                        funcao: 1,
                        username: null
                    };
                }
            }
        });       
    }
})();