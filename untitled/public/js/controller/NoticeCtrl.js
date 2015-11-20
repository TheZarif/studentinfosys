/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('NoticeCtrl', function ($scope, $rootScope, $state, NoticeService, toastr, AuthorizationFactory, AuthenticationFactory, $timeout) {
    //if(!$rootScope.user) $state.go('login')

    var userId = AuthenticationFactory.user._id;
    $scope.roleType = AuthenticationFactory.user.roleId;

    $scope.authorizer = AuthorizationFactory;

    $scope.event = {};
    $scope.sendTos = [];
    $scope.sendTo = {
        arr : [],
        newSendTo: "",
        options : [
            "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"
        ]
    }

    $scope.addSendTo = function (data) {
        $scope.sendTo.arr.push(data);
        $scope.sendTo.newSendTo = '';
        return false;
    }

    var viewCreateNotice = false;
    $scope.viewIfCreateNotice = function () {
        return viewCreateNotice;
    };
    $scope.toggleViewCreateNotice = function () {
        viewCreateNotice = !viewCreateNotice;
    };

    $scope.createNotice = function () {
        NoticeService.createNotice($scope.event, $scope.sendTo.options,
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

    $scope.openPicker = function () {
        $timeout(function () {
            $scope.picker.opened = true;
        });
    };

    $scope.closePicker = function () {
        $scope.picker.opened = false;
    };

    $scope.picker = {opened: false};

});