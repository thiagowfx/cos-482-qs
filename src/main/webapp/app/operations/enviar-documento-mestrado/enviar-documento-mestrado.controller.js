(function() {
    'use strict';

    angular
        .module('cos482App')
        .directive("fileread", [function () {
            return {
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
        vm.saveDeclaracaoConclusao = saveDeclaracaoConclusao;
        vm.saveCertidaoColacao = saveCertidaoColacao;
        vm.saveHistoricoGraduacao = saveHistoricoGraduacao;
        vm.saveCertidaoConclusao = saveCertidaoConclusao;

        vm.log = log_entity;



        getUserName();
        // getUsuarioId();
        // getAlunoId();
        // getAlunoMestradoId();

        loadAll();

        function loadAll() {
            console.log(JSON.stringify(vm.alunoData));
        }

        function saveDeclaracaoConclusao() {
            console.log(vm.declaracaoConclusao);
            console.log(vm.declaracaoConclusao.name);
        }

        function saveCertidaoColacao() {
            console.log(vm.certidaoColacao);
            console.log(vm.certidaoColacao.name);
        }

        function saveHistoricoGraduacao() {
            console.log(vm.historicoGraduacao);
            console.log(vm.historicoGraduacao.name);
        }

        function saveCertidaoConclusao() {
            console.log(vm.certidaoConclusao);
            console.log(vm.certidaoConclusao.name);
        }

        function saveDiplomaGraduacao() {
            console.log(vm.diplomaGraduacao);
            console.log(vm.diplomaGraduacao.name);
        }

        function filePicker() {
            var picker = document.getElementById("enviar-documento-mestrado-historico-graduacao");
            var txt = "";
            console.log("Here I am!!");
            if ('files' in picker) {
                var file = picker.files[0];
                console.log(JSON.file);
            //     if (x.files.length == 0) {
            //         txt = "Select one or more files.";
            //     } else {
            //         for (var i = 0; i < x.files.length; i++) {
            //             txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            //             var file = x.files[i];
            //             if ('name' in file) {
            //                 txt += "name: " + file.name + "<br>";
            //             }
            //             if ('size' in file) {
            //                 txt += "size: " + file.size + " bytes <br>";
            //             }
            //         }
            //     }
            // } 
            // else {
            //     if (x.value == "") {
            //         txt += "Select one or more files.";
            //     } else {
            //         txt += "The files property is not supported by your browser!";
            //         txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
            //     }
            // }
        }
            
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
