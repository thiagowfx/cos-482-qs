(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('documento-sistema', {
            parent: 'entity',
            url: '/documento-sistema',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.documentoSistema.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/documento-sistema/documento-sistemas.html',
                    controller: 'DocumentoSistemaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('documentoSistema');
                    $translatePartialLoader.addPart('statusDocumento');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('documento-sistema-detail', {
            parent: 'entity',
            url: '/documento-sistema/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.documentoSistema.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/documento-sistema/documento-sistema-detail.html',
                    controller: 'DocumentoSistemaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('documentoSistema');
                    $translatePartialLoader.addPart('statusDocumento');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DocumentoSistema', function($stateParams, DocumentoSistema) {
                    return DocumentoSistema.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'documento-sistema',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('documento-sistema-detail.edit', {
            parent: 'documento-sistema-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-sistema/documento-sistema-dialog.html',
                    controller: 'DocumentoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DocumentoSistema', function(DocumentoSistema) {
                            return DocumentoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('documento-sistema.new', {
            parent: 'documento-sistema',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-sistema/documento-sistema-dialog.html',
                    controller: 'DocumentoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipo: null,
                                formato: null,
                                timestampEnvio: null,
                                status: null,
                                escopo: null,
                                caminho: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('documento-sistema', null, { reload: 'documento-sistema' });
                }, function() {
                    $state.go('documento-sistema');
                });
            }]
        })
        .state('documento-sistema.edit', {
            parent: 'documento-sistema',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-sistema/documento-sistema-dialog.html',
                    controller: 'DocumentoSistemaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DocumentoSistema', function(DocumentoSistema) {
                            return DocumentoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('documento-sistema', null, { reload: 'documento-sistema' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('documento-sistema.delete', {
            parent: 'documento-sistema',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-sistema/documento-sistema-delete-dialog.html',
                    controller: 'DocumentoSistemaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DocumentoSistema', function(DocumentoSistema) {
                            return DocumentoSistema.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('documento-sistema', null, { reload: 'documento-sistema' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
