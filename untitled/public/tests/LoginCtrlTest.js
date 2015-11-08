/**
 * Created by Zarif on 08/11/2015.
 */
beforeEach(module('controllers'));

describe('LoginCtrl', function () {
    var scope, httpBackend, createController, mockState, mockToastr;

    beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        mockState =     {go:    function ()         {return}};
        mockToastr =    {
            error: function (error)    {return},
            warning: function (message)    {return},
            success: function (message)    {return}
        };


        createController = function () {
            return $controller('LoginCtrl', {
                '$scope' : scope,
                '$state' : mockState,
                'toastr' : mockToastr
            })
        }


    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('checking server login request', function () {

        it('should call toastr.error function when 403', function () {
            var controller = createController();
            scope.username = "hello";
            scope.password = "abc";

            spyOn(mockToastr,'error').and.callThrough();

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function (method, url, data, headers) {
                    return [403, 'response body', {}, 'TestPhrase'];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.error).toHaveBeenCalled();
        })

        it('should call state.go and toastr.success function when success', function () {
            var controller = createController();
            scope.username = "hello";
            scope.password = "abc";

            spyOn(mockToastr,'success').and.callThrough();
            spyOn(mockState,'go').and.callThrough();

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function (method, url, data, headers) {
                    return [200, 'response body', {}, 'TestPhrase'];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockState.go).toHaveBeenCalled();
        })


    })

    describe('checking validate function', function () {
        it('if both fields are not entered or both fields are undefined, should return false', function () {
            var controller = createController();
            scope.username = "";
            scope.password = "";

            expect(scope.validate()).toBe(false);

            scope.username = undefined;
            scope.password = undefined;

            expect(scope.validate()).toBe(false);
        })

        it('if either field is not entered, should return false', function () {
            var controller = createController();
            scope.username = "as";
            scope.password = "";

            expect(scope.validate()).toBe(false);

            scope.username = "";
            scope.password = "as";

            expect(scope.validate()).toBe(false);

            scope.username = "";
            scope.password = undefined;

            expect(scope.validate()).toBe(false);
        })

        it('if both fields are entered, should return true', function () {
            var controller = createController();
            scope.username = "as";
            scope.password = "as";

            expect(scope.validate()).toBe(true);
        })


    });



});