(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('DocumentoSistemaController', DocumentoSistemaController);

    DocumentoSistemaController.$inject = ['$scope', '$state', 'DocumentoSistema'];

    function DocumentoSistemaController ($scope, $state, DocumentoSistema) {
        var vm = this;
        
        vm.documentoSistemas = [];

        loadAll();

        function loadAll() {
            DocumentoSistema.query(function(result) {
                vm.documentoSistemas = result;
            });
        }
    }
})();
