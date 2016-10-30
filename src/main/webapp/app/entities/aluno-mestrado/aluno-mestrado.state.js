(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('aluno-mestrado', {
            parent: 'entity',
            url: '/aluno-mestrado',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.alunoMestrado.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrados.html',
                    controller: 'AlunoMestradoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('alunoMestrado');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('aluno-mestrado-detail', {
            parent: 'entity',
            url: '/aluno-mestrado/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'cos482App.alunoMestrado.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrado-detail.html',
                    controller: 'AlunoMestradoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('alunoMestrado');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AlunoMestrado', function($stateParams, AlunoMestrado) {
                    return AlunoMestrado.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'aluno-mestrado',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('aluno-mestrado-detail.edit', {
            parent: 'aluno-mestrado-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrado-dialog.html',
                    controller: 'AlunoMestradoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlunoMestrado', function(AlunoMestrado) {
                            return AlunoMestrado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('aluno-mestrado.new', {
            parent: 'aluno-mestrado',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrado-dialog.html',
                    controller: 'AlunoMestradoDialogController',
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
                    $state.go('aluno-mestrado', null, { reload: 'aluno-mestrado' });
                }, function() {
                    $state.go('aluno-mestrado');
                });
            }]
        })
        .state('aluno-mestrado.edit', {
            parent: 'aluno-mestrado',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrado-dialog.html',
                    controller: 'AlunoMestradoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AlunoMestrado', function(AlunoMestrado) {
                            return AlunoMestrado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('aluno-mestrado', null, { reload: 'aluno-mestrado' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('aluno-mestrado.delete', {
            parent: 'aluno-mestrado',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/aluno-mestrado/aluno-mestrado-delete-dialog.html',
                    controller: 'AlunoMestradoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AlunoMestrado', function(AlunoMestrado) {
                            return AlunoMestrado.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('aluno-mestrado', null, { reload: 'aluno-mestrado' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
