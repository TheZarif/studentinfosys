/**
 * Created by Zarif on 08/11/2015.
 */
"use strict";

describe('dashboard factory test', function () {

    var dashboardFactory;
    beforeEach(function () {
        module("app");
        inject(function (_DashboardFactory_) {
            dashboardFactory = _DashboardFactory_;
        })
    });

    it('should contain method getOptions', function () {
        expect(dashboardFactory.getOptions('admin')).toBeDefined();
        expect(dashboardFactory.getOptions('student')).toBeDefined();
        expect(dashboardFactory.getOptions('teacher')).toBeDefined();
        expect(dashboardFactory.getOptions('staff')).toBeDefined();
    });

});
