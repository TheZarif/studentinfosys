/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('NoticeCtrl', function ($scope, $rootScope, $state, NoticeService, toastr, AuthorizationFactory, AuthenticationFactory) {
    //if(!$rootScope.user) $state.go('login')

    var userId = AuthenticationFactory.user.userId;
    $scope.roleType = AuthenticationFactory.user.roleId;

    $scope.authorizer = AuthorizationFactory;

    $scope.event = {};

    var viewCreateNotice = false;
    $scope.viewIfCreateNotice = function () {
        return viewCreateNotice;
    };
    $scope.toggleViewCreateNotice = function () {
        viewCreateNotice = !viewCreateNotice;
    };

    $scope.createNotice = function () {
        NoticeService.createNotice($scope.event,
            function () {
                $scope.event = {};
            });
    };

    $scope.getEvents = function () {
        NoticeService.getEvents(userId,
            function (events) {
                $scope.events = events;
            });
    };

    $scope.deleteNotice = function (event) {
        NoticeService.deleteNotice(event, function () {
            remove($scope.events, event)
        });
    };


    populateOfflineEvents = function () {
        $scope.events = [
            {
                subject: "Oooh",
                body: "Hello",
                sender: "Abdus"
            },
            {
                subject: "Oh",
                body: "Hi",
                sender: "Abdus"
            }
        ];
    };
    populateOfflineEvents();
    $scope.getEvents();

    function remove(events, event){
        var index = events.indexOf(event);
        if(index > -1)      events.splice(index, 1);
    }

});