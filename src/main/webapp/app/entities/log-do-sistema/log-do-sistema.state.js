(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('log-do-sistema', {
            parent: 'entity',
            url: '/log-do-sistema',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.logDoSistema.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistemas.html',
                    controller: 'LogDoSistemaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('logDoSistema');
                    $translatePartialLoader.addPart('funcoes');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('log-do-sistema-detail', {
            parent: 'entity',
            url: '/log-do-sistema/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.logDoSistema.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistema-detail.html',
                    controller: 'LogDoSistemaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('logDoSistema');
                    $translatePartialLoader.addPart('funcoes');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'LogDoSistema', function($stateParams, LogDoSistema) {
                    return LogDoSistema.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'log-do-sistema',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('log-do-sistema-detail.edit', {
            parent: 'log-do-sistema-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistema-dialog.html',
                    controller: 'LogDoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LogDoSistema', function(LogDoSistema) {
                            return LogDoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('log-do-sistema.new', {
            parent: 'log-do-sistema',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistema-dialog.html',
                    controller: 'LogDoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                timestampFuncao: null,
                                funcao: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('log-do-sistema', null, { reload: 'log-do-sistema' });
                }, function() {
                    $state.go('log-do-sistema');
                });
            }]
        })
        .state('log-do-sistema.edit', {
            parent: 'log-do-sistema',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistema-dialog.html',
                    controller: 'LogDoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LogDoSistema', function(LogDoSistema) {
                            return LogDoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('log-do-sistema', null, { reload: 'log-do-sistema' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('log-do-sistema.delete', {
            parent: 'log-do-sistema',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/log-do-sistema/log-do-sistema-delete-dialog.html',
                    controller: 'LogDoSistemaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LogDoSistema', function(LogDoSistema) {
                            return LogDoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('log-do-sistema', null, { reload: 'log-do-sistema' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
