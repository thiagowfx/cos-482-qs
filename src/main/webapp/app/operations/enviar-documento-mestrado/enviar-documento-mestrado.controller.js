(function() {
    'use strict';

    angular
        .module('cos482App')
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                        });
                    });
                }
            }
        }])
        .controller('EnviarDocumentoMestradoController', EnviarDocumentoMestradoController);

    EnviarDocumentoMestradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema', 'LogDoSistema', 'log_entity', 'Principal', 'Usuario', 'Aluno', 'AlunoMestrado'];

    function EnviarDocumentoMestradoController ($window, $scope, $state, $translate, DocumentoSistema, LogDoSistema, log_entity, Principal, Usuario, Aluno, AlunoMestrado) {
        var vm = this;
        vm.alunoData = {};
        vm.saveDiplomaGraduacao = saveDiplomaGraduacao;

        vm.log = log_entity;


        getUserName();
        // getUsuarioId();
        // getAlunoId();
        // getAlunoMestradoId();

        loadAll();

        function loadAll() {
            console.log(JSON.stringify(vm.alunoData));
        }

        function getUserName() {
            var account = {};
            Principal.identity().then(function(account) {
                vm.alunoData.username = account.login;
                // Usuario.get(
                //     {login : vm.alunoData.username},
                //     function (result) {
                //         console.log(JSON.stringify(vm.alunoData));
                //         vm.alunoData.usuarioId = result.id;
                //         console.log(vm.alunoData.usuarioId);
                //         Aluno.get (
                //             {usuarioId: vm.alunoData.usuarioId},
                //             function (result) {
                //                 vm.alunoData.alunoId = result.id;
                //                 AlunoMestrado.get (
                //                     {alunoId: vm.alunoData.alunoId},
                //                     function (result) {
                //                         vm.alunoData.alunoMestradoId = result.id;
                //                     }
                //                 );                                
                //             }                        
                //         );
                //     }
                // );
            }(account));
            console.log(JSON.stringify(account));
        }

        function saveDiplomaGraduacao() {
            console.log(vm.diplomaGraduacao);
            console.log(vm.diplomaGraduacao.name);
        }

        function getUsuarioId (){
            console.log(vm.alunoData.username);
            Usuario.get(
                {login: vm.alunoData.username},
                function (result) {
                    console.log(result);
                    vm.alunoData.usuarioId = result.id;
                }
            );       
        }

        function getAlunoId () {
            Aluno.get (
                {usuarioId: vm.alunoData.usuarioId},
                function (result) {
                    vm.alunoData.alunoId = result.id;
                }
            );
        }

        function getAlunoMestradoId () {
            AlunoMestrado.get (
                {alunoId: vm.alunoData.alunoId},
                function (result) {
                    vm.alunoData.alunoMestradoId = result.id;
                }
            );
        }


        // TODO: clear function + clear button
        // TODO: ng-hide + check if null

        function LogUseCase() {
            Principal.identity().then(function(account) {
                vm.log.username = account.login;
                vm.log.timestampFuncao = new Date();
                LogDoSistema.save(vm.log, function(){}, function(){});
            });
        }
    }
})();
