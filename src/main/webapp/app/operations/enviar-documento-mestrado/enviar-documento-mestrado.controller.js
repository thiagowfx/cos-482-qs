(function() {
    'use strict';

    angular
        .module('cos482App')
        .controller('EnviarDocumentoMestradoController', EnviarDocumentoMestradoController);

    EnviarDocumentoMestradoController.$inject = ['$window', '$scope', '$state', '$translate', 'DocumentoSistema'];

    function EnviarDocumentoMestradoController ($window, $scope, $state, $translate, professor_entity, Professor, LogDoSistema, log_entity) {
        var vm = this;
    }
})();
