(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('documento-identificacao', {
            parent: 'entity',
            url: '/documento-identificacao',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.documentoIdentificacao.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacaos.html',
                    controller: 'DocumentoIdentificacaoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('documentoIdentificacao');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('documento-identificacao-detail', {
            parent: 'entity',
            url: '/documento-identificacao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.documentoIdentificacao.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacao-detail.html',
                    controller: 'DocumentoIdentificacaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('documentoIdentificacao');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DocumentoIdentificacao', function($stateParams, DocumentoIdentificacao) {
                    return DocumentoIdentificacao.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'documento-identificacao',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('documento-identificacao-detail.edit', {
            parent: 'documento-identificacao-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacao-dialog.html',
                    controller: 'DocumentoIdentificacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DocumentoIdentificacao', function(DocumentoIdentificacao) {
                            return DocumentoIdentificacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('documento-identificacao.new', {
            parent: 'documento-identificacao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacao-dialog.html',
                    controller: 'DocumentoIdentificacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipo: null,
                                valor: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('documento-identificacao', null, { reload: 'documento-identificacao' });
                }, function() {
                    $state.go('documento-identificacao');
                });
            }]
        })
        .state('documento-identificacao.edit', {
            parent: 'documento-identificacao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacao-dialog.html',
                    controller: 'DocumentoIdentificacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DocumentoIdentificacao', function(DocumentoIdentificacao) {
                            return DocumentoIdentificacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('documento-identificacao', null, { reload: 'documento-identificacao' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('documento-identificacao.delete', {
            parent: 'documento-identificacao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/documento-identificacao/documento-identificacao-delete-dialog.html',
                    controller: 'DocumentoIdentificacaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DocumentoIdentificacao', function(DocumentoIdentificacao) {
                            return DocumentoIdentificacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('documento-identificacao', null, { reload: 'documento-identificacao' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
