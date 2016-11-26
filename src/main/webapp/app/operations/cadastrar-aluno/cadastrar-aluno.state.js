(function() {
    'use strict';

    angular
        .module('cos482App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cadastrar-aluno', {
            parent: 'operations',
            url: '/cadastrar-aluno',
            data: {
                authorities: ['ROLE_SECRETARIO_ACADEMICO'],
                pageTitle: 'global.menu.operations.cadastrar_aluno'
            },
            views: {
                'content@': {
                    templateUrl: 'app/operations/cadastrar-aluno/cadastrar-aluno.html',
                    controller: 'CadastrarAlunoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('cadastrar-aluno');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                aluno_doutorado_entity: function () {
                    return {
                        id: null,
                        ataDissertacaoId: null,
                        certidaoConclusaoId: null,
                        diplomaMestradoId: null,
                        alunoId: null
                    };
                },
                aluno_mestrado_entity: function () {
                    return {
                        id: null,
                        certidadoConclusaoId: null,
                        diplomaGraduacaoId: null,
                        certidaoColacaoId: null,
                        alunoId: null
                    };
                },
                aluno_entity: function () {
                    return {
                        id: null,
                        dre: null,
                        matricula: null,
                        declaracaoConclusaoId: null,
                        historicoGradaucaoId: null,
                        usuarioId: null
                    };
                },
                usuario_entity: function () {
                    return {
                        id: null,
                        nome: null,
                        conta: 0,
                        cpfId: null,
                        rgId: null,
                        tituloDeEleitorId: null,
                        passaporteId: null,
                        systemUserId: null
                    };
                },
                user_entity: function () {
                    return {
                        id: null,
                        login: null,
                        passwordHash: null,
                        firstName: null,
                        lastName: null,
                        email: null
                    };
                },
                cpf_entity: function () {
                    return {
                        id: null,
                        tipo: "CPF",
                        valor: null
                    };
                },
                rg_entity: function () {
                    return {
                        id: null,
                        tipo: "RG",
                        valor: null
                    };
                },
                titulo_entity: function () {
                    return {
                        id: null,
                        tipo: "TITULO",
                        valor: null
                    };
                },
                dispensa_entity: function () {
                    return {
                        id: null,
                        tipo: "DISPENSA",
                        valor: null
                    };
                },
                passaporte_entity: function () {
                    return {
                        id: null,
                        tipo: "PASSAPORTE",
                        valor: null
                    };
                }
            }
        });
    }
})();
