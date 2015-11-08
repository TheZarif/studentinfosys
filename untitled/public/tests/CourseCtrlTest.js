/**
 * Created by Zarif on 08/11/2015.
 */
/**
 * Created by Zarif on 08/11/2015.
 */
beforeEach(module('controllers'));

describe('Course controller test', function () {
    var scope, httpBackend, createController, mockState, mockToastr, mockData;

    beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        scope.baseUrl = 'http://localhost:3000/api/';
        scope.courseName = "hello";
        scope.courseId = "CS101";
        scope.courseCredit = "as";

        mockState =     {go:    function ()         {}};
        mockToastr =    {
            error: function (error)    {},
            warning: function (message)    {},
            success: function (message)    {}
        };

        createController = function () {
            return $controller('CourseCtrl', {
                '$scope' : scope,
                '$state' : mockState,
                'toastr' : mockToastr,
                '$rootScope' :  scope
            })
        };

        mockData = [{something: "something"}];

    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('checking validate function', function () {
        it('if all three fields are not entered or are undefined, should return false', function () {
            createController();
            scope.courseName = "";
            scope.courseId = "";
            scope.courseCredit = "";
            expect(scope.validate()).toBe(false);

            scope.courseName = undefined;
            scope.courseId = undefined;
            scope.courseCredit = undefined;
            expect(scope.validate()).toBe(false);
        });

        it('if any field is not entered, should return false', function () {
            createController();
            scope.courseName = "course";
            scope.courseId = "CS101";
            scope.courseCredit = "";
            expect(scope.validate()).toBe(false);

            scope.courseName = "course";
            scope.courseId = "";
            scope.courseCredit = "";
            expect(scope.validate()).toBe(false);

            scope.courseName = "course";
            scope.courseId = "";
            scope.courseCredit = undefined;
            expect(scope.validate()).toBe(false);
        });

        it('if all fields are entered, should return true', function () {
            createController();
            scope.courseName = "course";
            scope.courseId = "ds123";
            scope.courseCredit = "12";
            expect(scope.validate()).toBe(true);
        })
    });

    describe('checking http for course create', function () {
        beforeEach(function () {
            createController();
        })

        it('Should trigger error response', function () {
            scope.courseName = "course";
            scope.courseId = "ds123";
            scope.courseCredit = "12";
            spyOn(mockToastr, 'error');

            httpBackend.whenPOST('http://localhost:3000/api/courses')
                .respond(function () {
                    return [403]
                })

            scope.createCourse();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.error).toHaveBeenCalled();
        })

        it('Should trigger success response, show success toast, init variables', function () {
            scope.courseName = "course";
            scope.courseId = "ds123";
            scope.courseCredit = "12";
            spyOn(mockToastr, 'success');

            httpBackend.whenPOST('http://localhost:3000/api/courses')
                .respond(function () {
                    return [200, {data: "data"}];
                })

            scope.createCourse();
            scope.$apply();
            httpBackend.flush();

            expect(mockToastr.success).toHaveBeenCalled();
            expect(scope.courseName).toBe("");
            expect(scope.courseId).toBe("");
            expect(scope.courseCredit).toBe("");
        })
    })

    //describe('checking server login request', function () {
    //
    //    it('should call toastr.error function when 403', function () {
    //        createController();
    //        scope.username = "hello";
    //        scope.password = "abc";
    //
    //        spyOn(mockToastr,'error').and.callThrough();
    //
    //        httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
    //            .respond(function () {
    //                return [403, 'response body', {}, 'TestPhrase'];
    //            });
    //        scope.submit();
    //        scope.$apply();
    //        httpBackend.flush();
    //
    //        expect(mockToastr.error).toHaveBeenCalled();
    //    });
    //
    //    it('should call state.go and toastr.success function when success', function () {
    //        createController();
    //        scope.username = "hello";
    //        scope.password = "abc";
    //
    //        spyOn(mockToastr,'success').and.callThrough();
    //        spyOn(mockState,'go').and.callThrough();
    //
    //        httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
    //            .respond(function () {
    //                return [200, 'response body', {}, 'TestPhrase'];
    //            });
    //        scope.submit();
    //        scope.$apply();
    //        httpBackend.flush();
    //
    //        expect(mockToastr.success).toHaveBeenCalled();
    //        expect(mockState.go).toHaveBeenCalled();
    //    });
    //
    //    it('should populate rootscope.user', function () {
    //        createController();
    //        scope.username = "hello";
    //        scope.password = "abc";
    //
    //        httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
    //            .respond(function () {
    //                return [200, mockData];
    //            });
    //        scope.submit();
    //        scope.$apply();
    //        httpBackend.flush();
    //
    //        expect(scope.user).toEqual(mockData[0]);
    //    });
    //
    //    it('should call localstorate.setItem', function () {
    //        createController();
    //        scope.username = "hello";
    //        scope.password = "abc";
    //        spyOn(localStorage,'setItem').and.callThrough();
    //
    //        httpBackend.whenPOST("http://localhost:3000/api/authenticateUser")
    //            .respond(function () {
    //                return [200, mockData];
    //            });
    //        scope.submit();
    //        scope.$apply();
    //        httpBackend.flush();
    //
    //        expect(localStorage.setItem).toHaveBeenCalled();
    //    })
    //
    //
    //
    //});





});