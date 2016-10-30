(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoIdentificacaoController', DocumentoIdentificacaoController);

    DocumentoIdentificacaoController.$inject = ['$scope', '$state', 'DocumentoIdentificacao'];

    function DocumentoIdentificacaoController ($scope, $state, DocumentoIdentificacao) {
        var vm = this;
        
        vm.documentoIdentificacaos = [];

        loadAll();

        function loadAll() {
            DocumentoIdentificacao.query(function(result) {
                vm.documentoIdentificacaos = result;
            });
        }
    }
})();
