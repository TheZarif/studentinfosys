/**
 * Created by Zarif on 18/11/2015.
 */

app.service('CategoryService', function ($http, $rootScope, toastr) {

    var baseUrl = $rootScope.baseUrl;

    this.getCategories = function (courseId, successFunc) {
        $http.get(baseUrl + "getCategoriesByCourseId/" + courseId)
            .success(function (categories) {
                console.log("Categories retrieved for course " + courseId, categories);
                successFunc(categories);
            })
            .error(function (err) {
                console.log("Couldn't get categories for course " + courseId, err);
                toastr.warning("Something went wrong", "Oops!");
            })
    };

    this.getSubCategories = function (categoryId, successFunc) {
        $http.get(baseUrl + "subcategories/getSubCategoriesByCategoryId/" + categoryId)
            .success(function (subCategories) {
                console.log("Categories retrieved for category " + categoryId, subCategories);
                successFunc(subCategories);
            })
            .error(function (err) {
                console.log("Couldn't get subCategories for category " + categoryId, err);
                toastr.warning("Something went wrong", "Oops!");
            })
    };

    this.updateCategory = function (category, successFunc) {
        $http.put(baseUrl + "categories/" + category._id, category)
            .success(function (categories) {
                console.log("Category updated" + category._id, categories);
                toastr.success("Updated", "Success!");
            })
            .error(function (err) {
                console.log("Couldn't update category" + category._id, err);
                toastr.warning("Something went wrong", "Oops!");
            })
    };

    this.updateSubCategory = function (subCategory, successFunc) {
        $http.put(baseUrl + "subCategories/" + subCategory._id, subCategory)
            .success(function (data) {
                console.log("subCategory updated", data);
                toastr.success("Updated", "Success!");
            })
            .error(function (err) {
                console.log("Couldn't update subCategory", err);
                toastr.warning("Something went wrong", "Oops!");
            })
    };

    this.updateAllCategoriesForCourse= function (course, categories) {
        $http.put(baseUrl + "categories/" + course._id, categories)
            .success(function (categories) {
                console.log("Categories retrieved for course " + course._id, categories);
                toastr.success("Updated", "Success!");
            })
            .error(function (err) {
                console.log("Couldn't update category for course " + course._id, err);
                toastr.warning("Something went wrong", "Oops!");
            })
    };

    this.delteCategory = function (category, successFunc) {
        $http.delete(baseUrl + "categories/" + category._id)
            .success(function () {
                console.log("Category deleted for course " + course._id, category);
                toastr.success("Updated", "Success!");
            })
            .error(function (err) {
                console.log("Couldn't update category for course " + course._id, err);
                toastr.warning("Something went wrong", "Oops!");
            })
    }
});
