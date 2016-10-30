'use strict';

describe('Controller Tests', function() {

    describe('AlunoDoutorado Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAlunoDoutorado, MockDocumentoSistema, MockAluno;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAlunoDoutorado = jasmine.createSpy('MockAlunoDoutorado');
            MockDocumentoSistema = jasmine.createSpy('MockDocumentoSistema');
            MockAluno = jasmine.createSpy('MockAluno');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'AlunoDoutorado': MockAlunoDoutorado,
                'DocumentoSistema': MockDocumentoSistema,
                'Aluno': MockAluno
            };
            createController = function() {
                $injector.get('$controller')("AlunoDoutoradoDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'cos482App:alunoDoutoradoUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
