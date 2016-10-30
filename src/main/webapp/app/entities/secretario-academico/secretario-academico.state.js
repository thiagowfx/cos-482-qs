(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('secretario-academico', {
            parent: 'entity',
            url: '/secretario-academico',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.secretarioAcademico.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/secretario-academico/secretario-academicos.html',
                    controller: 'SecretarioAcademicoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('secretarioAcademico');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('secretario-academico-detail', {
            parent: 'entity',
            url: '/secretario-academico/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.secretarioAcademico.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/secretario-academico/secretario-academico-detail.html',
                    controller: 'SecretarioAcademicoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('secretarioAcademico');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SecretarioAcademico', function($stateParams, SecretarioAcademico) {
                    return SecretarioAcademico.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'secretario-academico',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('secretario-academico-detail.edit', {
            parent: 'secretario-academico-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/secretario-academico/secretario-academico-dialog.html',
                    controller: 'SecretarioAcademicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SecretarioAcademico', function(SecretarioAcademico) {
                            return SecretarioAcademico.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('secretario-academico.new', {
            parent: 'secretario-academico',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/secretario-academico/secretario-academico-dialog.html',
                    controller: 'SecretarioAcademicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('secretario-academico', null, { reload: 'secretario-academico' });
                }, function() {
                    $state.go('secretario-academico');
                });
            }]
        })
        .state('secretario-academico.edit', {
            parent: 'secretario-academico',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/secretario-academico/secretario-academico-dialog.html',
                    controller: 'SecretarioAcademicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SecretarioAcademico', function(SecretarioAcademico) {
                            return SecretarioAcademico.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('secretario-academico', null, { reload: 'secretario-academico' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('secretario-academico.delete', {
            parent: 'secretario-academico',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/secretario-academico/secretario-academico-delete-dialog.html',
                    controller: 'SecretarioAcademicoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SecretarioAcademico', function(SecretarioAcademico) {
                            return SecretarioAcademico.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('secretario-academico', null, { reload: 'secretario-academico' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
