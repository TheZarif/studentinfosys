/**
 * Created by Zarif on 08/11/2015.
 */
beforeEach(module('controllers'));

describe('LoginCtrl', function () {
    var scope, httpBackend, createController, mockState, mockToastr, mockData;

    beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        mockState =     {go:    function ()         {}};
        mockToastr =    {
            error: function (error)    {},
            warning: function (message)    {},
            success: function (message)    {}
        };


        createController = function () {
            return $controller('LoginCtrl', {
                '$scope' : scope,
                '$state' : mockState,
                'toastr' : mockToastr
            })
        };

        mockData = [
            {
                something: "something"
            }
        ]

    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('checking server login request', function () {

        it('should call toastr.error function when 403', function () {
            createController();
            scope.username = "hello";
            scope.password = "abc";

            spyOn(mockToastr,'error').and.callThrough();

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function () {
                    return [403, 'response body', {}, 'TestPhrase'];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.error).toHaveBeenCalled();
        });

        it('should call state.go and toastr.success function when success', function () {
            createController();
            scope.username = "hello";
            scope.password = "abc";

            spyOn(mockToastr,'success').and.callThrough();
            spyOn(mockState,'go').and.callThrough();

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function () {
                    return [200, 'response body', {}, 'TestPhrase'];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockState.go).toHaveBeenCalled();
        });

        it('should populate rootscope.user', function () {
            createController();
            scope.username = "hello";
            scope.password = "abc";

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function () {
                    return [200, mockData];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(scope.user).toEqual(mockData[0]);
        });

        it('should call localstorate.setItem', function () {
            createController();
            scope.username = "hello";
            scope.password = "abc";
            spyOn(localStorage,'setItem').and.callThrough();

            httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
                .respond(function () {
                    return [200, mockData];
                });
            scope.submit();
            scope.$apply();
            httpBackend.flush();

            expect(localStorage.setItem).toHaveBeenCalled();
        })



    });

    describe('checking validate function', function () {
        it('if both fields are not entered or both fields are undefined, should return false', function () {
            createController();
            scope.username = "";
            scope.password = "";

            expect(scope.validate()).toBe(false);

            scope.username = undefined;
            scope.password = undefined;

            expect(scope.validate()).toBe(false);
        });

        it('if either field is not entered, should return false', function () {
            createController();
            scope.username = "as";
            scope.password = "";

            expect(scope.validate()).toBe(false);

            scope.username = "";
            scope.password = "as";

            expect(scope.validate()).toBe(false);

            scope.username = "";
            scope.password = undefined;

            expect(scope.validate()).toBe(false);
        });

        it('if both fields are entered, should return true', function () {
            createController();
            scope.username = "as";
            scope.password = "as";

            expect(scope.validate()).toBe(true);
        })


    });



});