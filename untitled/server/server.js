/**
 * Created by IIT on 02-Nov-15.
 */

var express = require("express");
var path = require('path');
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require('express-session');

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE'}));
var logger = require("morgan");
///////////////////////auth
app.use(logger('dev'));
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});




mongoose.connect('mongodb://localhost/jetbrains');

exports = module.exports = app;
var roleController = require('./controllers/roles.server.controller');
var userController = require('./controllers/users.server.controller');
var sessionController = require('./controllers/session.server.controller');
var courseController = require('./controllers/courses.server.controller');
var eventNotificationController = require('./controllers/eventNotifications.server.controller');
var receiverNotification     = require('./controllers/receiverNotification.controller.js');
var categoryController     = require('./controllers/categories.server.controller.js');
var subCategoryController     = require('./controllers/subCategories.server.controller.js');
var authorizationController = require('./authentication/auth');

var checkAuthenticate = require('./middleWares/validateRequests');
var router = express.Router();
//router.all('/a/*', [require('./middleWares/validateRequests')]);
// get an instance of the express Router
//-------------------------------role
router.route('/authenticate/roles')
    .post(roleController.create)
    .get(roleController.list);
router.route('/roles/:_id')
    .get(roleController.getByRoleId)
    .put(roleController.update)
        .delete(roleController.delete);
//-------------------------------user

router.route('/authenticate/users')
    .post(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeAdmin,userController.create)
    .get(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeAdmin,userController.list);
router.route('/authenticate/users/:_id')
    .get(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeAdmin,userController.getByUserId)
    .put(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeAdmin,userController.update)
    .delete(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeAdmin,userController.delete);

router.route('/authenticate/allUsers/:_id').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,userController.getUsersByRoleId);
router.route('/authenticate/allStudents').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,userController.getAllStudents);
router.route('/authenticate/allTeachers').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,userController.getAllTeachers);
router.route('/authenticate/allAdmins').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,userController.getAllAdmins);
router.route('/authenticate/allStaffs').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,userController.getAllStaffs);
//--------------------------------course
router.route('/authenticate/courses').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,courseController.list);
router.route('/authenticate/courses').post(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,courseController.create)

router.route('/authenticate/courses/:_id')
    .put(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,courseController.update)
    .delete(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeAdmin,courseController.delete);
router.route('/authenticate/getCoursesForTeacher/:_id').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeTeacher,courseController.getCoursesForTeacher);
router.route('/authenticate/getCoursesForStudent/:_id').get(checkAuthenticate.isAuthenticated,
    checkAuthenticate.AuthorizeStudent,courseController.getCoursesForStudent);
//-------------------------------eventnotification
router.route('/authenticate/events')
    .post(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeExceptStudent,eventNotificationController.create)
    .get(checkAuthenticate.isAuthenticated,eventNotificationController.list);
router.route('/authenticate/events/:_id')
    .put(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeExceptStudent,eventNotificationController.update)
    .delete(checkAuthenticate.isAuthenticated,checkAuthenticate.AuthorizeExceptStudent,eventNotificationController.delete);
//-----------------------------------receiverNotification
router.route('/authenticate/receiverEventList')
    .get(checkAuthenticate.isAuthenticated,receiverNotification.list);
router.route('/authenticate/receiverEventList/:_id')
    .delete(checkAuthenticate.isAuthenticated,receiverNotification.delete);
router.route('/authenticate/getNotificationsForUser/:_id')
    .get(checkAuthenticate.isAuthenticated,receiverNotification.getNotificationsForUser);

//-----------------------------------------------------------------------------------------------------------------
/*
router.route('/users')
    .post(userController.create)
    .get(userController.list);
router.route('/users/:_id')
    .get(userController.getByUserId)
    .put(userController.update)
    .delete(userController.delete);

router.route('/allUsers/:_id').get(userController.getUsersByRoleId);
router.route('/allStudents').get(userController.getAllStudents);
router.route('/allTeachers').get(userController.getAllTeachers);
router.route('/allAdmins').get(userController.getAllAdmins);
router.route('/allStaffs').get(userController.getAllStaffs);
//--------------------------------course
router.route('/courses').get(courseController.list);
router.route('/courses').post(courseController.create)

router.route('/courses/:_id')
    .put(courseController.update)
    .delete(courseController.delete);
router.route('/getCoursesForTeacher/:_id').get(courseController.getCoursesForTeacher);
router.route('/getCoursesForStudent/:_id').get(courseController.getCoursesForStudent);
//-------------------------------eventnotification
router.route('/events')
    .post(eventNotificationController.create)
    .get(eventNotificationController.list);
router.route('/events/:_id')
    .put(eventNotificationController.update)
    .delete(eventNotificationController.delete);
//-----------------------------------receiverNotification
router.route('/receiverEventList')
    .get(receiverNotification.list);
router.route('/receiverEventList/:_id')
    .delete(receiverNotification.delete);
router.route('/getNotificationsForUser/:_id')
    .get(receiverNotification.getNotificationsForUser);*/
router.route('/categories').get(categoryController.list)
    .post(categoryController.create);
router.route('/categories/getCategoriesByCourseId/:_id').get(categoryController.getCategoriesByCourseId);
router.route('/categories/:_id').put(categoryController.update)
    .delete(categoryController.delete);
router.route('/subcategories').get(subCategoryController.list)
    .post(subCategoryController.create);
router.route('/subcategories/getSubCategoriesByCategoryId/:_id').get(subCategoryController.getSubCategoriesByCategoryId)
router.route('/subcategories/:_id').put(subCategoryController.update)
    .delete(subCategoryController.delete);

/*
 * Routes that can be accessed by any one
 */

router.route('/login').post( authorizationController.login);
//-------------------------------session
router.route('/authenticateUser').post(sessionController.login);
router.route('/logout').get(sessionController.logout);
//check authentication
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.listen(3000);
console.log('Magic happens on port 3000');

