/**
 * Created by Zarif on 18/11/2015.
 */


ctrls.controller('TeacherCtrl', function ($scope, $rootScope, toastr, AuthenticationFactory, CourseService, CategoryService) {

    var userId = AuthenticationFactory.user.userId;

    $scope.selectCourse = function (course) {
        $scope.selectedCourse = course;
        getCategories();
    };

    $scope.selectCategory = function (category) {
        $scope.selectedCategory = category;
        getSubCategories();
    }

    $scope.saveWeight = function () {
        if($scope.validateWeight()){
            console.log('Saved');
        }
    };

    $scope.saveSubCategory = function (subCategory) {
        if(validateSubCategory){
            console.log('Saved');
            CategoryService.updateSubCategory(subCategory);
        }
    }

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
                courseName:  "Network Security",
                courseCode : "CSE 802",
                credit : 3,
                teacherAssigned : "Rayhan",
                semester : "8th"
            },
            {
                courseName:  "Structured Programming",
                courseCode : "CSE 105",
                credit : 3,
                teacherAssigned : "Rayhan",
                semester : "8th"
            }
        ];

        $scope.categories = [
            {
                name: "Mid terms",
                description : "",
                weight : 40,
                isSelected : true,
                date : "",
                hasSubCategory : false,
                courseId : "191911"
            },
            {
                name: "Final",
                description : "",
                weight : 60,
                isSelected : true,
                date : "",
                hasSubCategory : false,
                courseId : "412"
            }
        ];

        var marks = [
            {
                studentName : "Zarif",
                studentRoll : "BSSE0430",
                mark : 19
            },
            {
                studentName : "Neela",
                studentRoll : "BSSE0431",
                mark : 20
            }
        ]

        $scope.subCategories = [
            {
                name : "Mid 1",
                description : "Mid term 1",
                date : "2014/11/29",
                marksOutOf : 20,
                listOfMark : marks
            },
            {
                name : "Mid 2",
                description : "Mid term 2",
                date : "2014/12/29",
                marksOutOf : 20,
                listOfMark : marks
            },
        ];
        $scope.selectedCourse = $scope.courses[1];
    }
    function init() {
        CourseService.getCoursesForTeacher(userId, function (courses) {
            $scope.courses = courses;
        });
        getCategories();
    }

    offlineInit();
    init();

    $scope.validateWeight = function () {
        var sum = 0;
        for(var i=0; i<$scope.categories.length;i++){
            sum += $scope.categories[i].weight;
        }
        if(sum != 100){
            $scope.validationError = "*Sum of weights must equal 100";
            return false;
        }
        else{
            $scope.validationError = "";
            return true;
        }

    };

    var validateSubCategory = function () {
        return true;
    }

})