/**
 * Created by Zarif on 08/11/2015.
 */

app.directive('dashboardContent', function () {
    return {
        restrict: 'A',
        scope: {
            item : '='
        },
        link: function($scope)
        {
            $scope.$watch('item', function(item)
            {
                if (item && item.length)
                {
                    $scope.dynamicTemplateUrl = 'views/' + item + '.html';
                }
            });
        },

        template: '<ng-include src="dynamicTemplateUrl"></ng-include>'
    }
})
