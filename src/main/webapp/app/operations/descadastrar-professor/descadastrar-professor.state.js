(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('descadastrar-professor', {
            parent: 'operations',
            url: '/descadastrar-professor',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO', 'ROLE_ADMIN'],
                pageTitle: 'global.menu.operations.descadastrar_professor'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/descadastrar-professor/descadastrar-professor.html',
                    controller: 'DescadastrarProfessorController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                	$translatePartialLoader.addPart('descadastrar-professor');
                	$translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('descadastrar-professor.delete', {
            parent: 'descadastrar-professor',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/descadastrar-professor/descadastrar-professor-delete-dialog.html',
                    controller: 'DescadastrarProfessorDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Professor', function(Professor) {
                            return Professor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('descadastrar-professor', null, { reload: 'descadastrar-professor' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }
})();
