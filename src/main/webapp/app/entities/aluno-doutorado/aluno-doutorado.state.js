(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('aluno-doutorado', {
            parent: 'entity',
            url: '/aluno-doutorado',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.alunoDoutorado.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorados.html',
                    controller: 'AlunoDoutoradoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('alunoDoutorado');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('aluno-doutorado-detail', {
            parent: 'entity',
            url: '/aluno-doutorado/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.alunoDoutorado.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorado-detail.html',
                    controller: 'AlunoDoutoradoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('alunoDoutorado');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AlunoDoutorado', function($stateParams, AlunoDoutorado) {
                    return AlunoDoutorado.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'aluno-doutorado',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('aluno-doutorado-detail.edit', {
            parent: 'aluno-doutorado-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorado-dialog.html',
                    controller: 'AlunoDoutoradoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlunoDoutorado', function(AlunoDoutorado) {
                            return AlunoDoutorado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('aluno-doutorado.new', {
            parent: 'aluno-doutorado',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorado-dialog.html',
                    controller: 'AlunoDoutoradoDialogController',
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
                    $state.go('aluno-doutorado', null, { reload: 'aluno-doutorado' });
                }, function() {
                    $state.go('aluno-doutorado');
                });
            }]
        })
        .state('aluno-doutorado.edit', {
            parent: 'aluno-doutorado',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorado-dialog.html',
                    controller: 'AlunoDoutoradoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlunoDoutorado', function(AlunoDoutorado) {
                            return AlunoDoutorado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('aluno-doutorado', null, { reload: 'aluno-doutorado' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('aluno-doutorado.delete', {
            parent: 'aluno-doutorado',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-doutorado/aluno-doutorado-delete-dialog.html',
                    controller: 'AlunoDoutoradoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AlunoDoutorado', function(AlunoDoutorado) {
                            return AlunoDoutorado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('aluno-doutorado', null, { reload: 'aluno-doutorado' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
