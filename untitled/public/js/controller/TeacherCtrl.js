/**
 * Created by Zarif on 18/11/2015.
 */


ctrls.controller('TeacherCtrl', function ($scope, $rootScope, toastr, AuthenticationFactory, CourseService, CategoryService, $timeout) {

    var userId = AuthenticationFactory.user.userId;

    $scope.addCategory = function () {
        $scope.categories.push({})
        $scope.validationError = "All fields must be entered";
    }

    $scope.selectCourse = function (course) {
        $scope.selectedCourse = course;
        getCategories();
    };

    $scope.selectCategory = function (category) {
        $scope.selectedCategory = category;
        getSubCategories();
    }

    $scope.updateCategory = function (category) {
        CategoryService.updateCategory(category)
    };

    $scope.updateCategoriesForCourse = function (course) {
        if ($scope.validateCategories()) {
            CategoryService.updateAllCategoriesForCourse(course, $scope.categories)
        }
    };

    $scope.saveSubCategory = function (subCategory) {
        if (validateSubCategory) {
            console.log('Saved');
            CategoryService.updateSubCategory(subCategory);
        }
    };

    var getCategories = function () {
        CategoryService.getCategories($scope.selectedCourse._id, function (categories) {
            $scope.categories = categories;
        })
    };

    var getSubCategories = function () {
        CategoryService.getSubCategories($scope.selectedCategory._id, function (subCategories) {
            $scope.subCategories = subCategories;
        })
    };

    function offlineInit() {
        $scope.courses = [
            {
                _id: "1901913",
                courseName: "Network Security",
                courseCode: "CSE 802",
                credit: 3,
                teacherAssigned: "Rayhan",
                semester: "8th"
            },
            {
                _id: "1922433",
                courseName: "Structured Programming",
                courseCode: "CSE 105",
                credit: 3,
                teacherAssigned: "Rayhan",
                semester: "8th"
            }
        ];

        $scope.categories = [
            {
                _id: "1915213",
                name: "Mid terms",
                description: "",
                weight: 40,
                isSelected: true,
                date: "",
                hasSubCategory: false,
                courseId: "191911"
            },
            {
                _id: "1941324",
                name: "Final",
                description: "",
                weight: 60,
                isSelected: true,
                date: "",
                hasSubCategory: false,
                courseId: "412"
            }
        ];

        var marks = [
            {
                studentName: "Zarif",
                studentRoll: "BSSE0430",
                mark: 19
            },
            {
                studentName: "Neela",
                studentRoll: "BSSE0431",
                mark: 20
            }
        ];

        $scope.subCategories = [
            {
                name: "Mid 1",
                description: "Mid term 1",
                marksOutOf: 20,
                listOfMark: marks
            },
            {
                name: "Mid 2",
                description: "Mid term 2",
                marksOutOf: 20,
                listOfMark: marks
            }
        ];
        $scope.selectedCourse = $scope.courses[1];
        $scope.selectedCategory = $scope.categories[0];
    }

    function init() {
        CourseService.getCoursesForTeacher(userId, function (courses) {
            $scope.courses = courses;
        });
    }

    offlineInit();
    init();

    $scope.validateCategories = function () {
        var sum = 0;
        for (var i = 0; i < $scope.categories.length; i++) {
            if (!$scope.categories[i].name || !$scope.categories[i].weight) {
                $scope.validationError = "All fields must be entered";
                return false;
            }
            sum += $scope.categories[i].weight;
        }
        if (sum != 100) {
            $scope.validationError = "*Sum of weights must equal 100";
            return false;
        }
        else {
            $scope.validationError = "";
            return true;
        }
    };

    var validateSubCategory = function () {
        return true;
    }

    $scope.validateMarksOutOf = function (data) {
        if (isNaN(data)) {
            toastr.warning("Invalid input", "Oops!");
            return false;
        }
        else
            return true
    }

    $scope.picker = {opened: false};

    $scope.openPicker = function () {
        $timeout(function () {
            $scope.picker.opened = true;
        });
    };

    $scope.closePicker = function () {
        $scope.picker.opened = false;
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.showAddCatMarkDis = true;

})
