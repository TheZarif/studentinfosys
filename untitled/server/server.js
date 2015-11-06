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


mongoose.connect('mongodb://localhost/jetbrains');

exports = module.exports = app;
var roleController = require('./controllers/roles.server.controller');
var userController = require('./controllers/users.server.controller');
var sessionController = require('./controllers/session.server.controller');

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
    .post(sessionController.isLoggedIn, userController.create)
    .get(userController.list);
router.route('/users/:_id')
    .get(userController.getByUserId)
    .put(userController.update)
    .delete(userController.delete);
router.route('/allUsers/:_id')
    .get(userController.getUsersByRoleId);
//-------------------------------session
router.route('/authenticateUser').post(sessionController.login);
router.route('/logout').get(sessionController.logout);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000);
console.log('Magic happens on port 3000');

