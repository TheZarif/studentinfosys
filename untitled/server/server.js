/**
 * Created by IIT on 02-Nov-15.
 */

var express = require("express");
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
var authorizationController = require('./authentication/auth');


var router = express.Router();              // get an instance of the express Router
//-------------------------------role
router.route('/roles')
    .post(roleController.create)
    .get(roleController.list);
router.route('/roles/:_id')
    .get(roleController.getByRoleId)
    .put(roleController.update)
        .delete(roleController.delete);
//-------------------------------user
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
router.route('/courses')
    .post(courseController.create)
    .get(courseController.list);
router.route('/courses/:_id')
    .put(courseController.update)
    .delete(courseController.delete);
router.route('/getCoursesForTeacher/:_id').get(courseController.getCoursesForTeacher);

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
    .get(receiverNotification.getNotificationsForUser);
router.route('/events/:_id')
    .put(eventNotificationController.update)
    .delete(eventNotificationController.delete);
/*
 * Routes that can be accessed by any one
 */
router.route('/login').post( authorizationController.login);
//-------------------------------session
router.route('/authenticateUser').post(sessionController.login);
router.route('/logout').get(sessionController.logout);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000);
console.log('Magic happens on port 3000');

