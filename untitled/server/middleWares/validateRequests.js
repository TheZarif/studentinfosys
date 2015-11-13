/**
 * Created by IIT on 12-Nov-15.
 */
var jwt = require('jwt-simple');
var User  = require('../models/user.server.model.js');

exports.isAuthenticated = function(req, res, next) {
   var  token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (token || key) {
        try {
            console.log("here it is" + token);
            var decoded = jwt.decode(token, require('../config/secret.js')());
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "from middleWare Token Expired"
                });
                return;
            }
            if((req.url.indexOf('authenticate')>=0)){next();}
// Authorize the user to see if s/he can access our resources
          //  console.log("......."+dbUser);// The key would be the logged in user's username
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "from middleWare Invalid Token or Key"
        });
        return;
    }
};
exports.AuthorizeAdmin = function(req, res, next){
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    User.findOne({email: key}, function (err, user) {
        var dbUser;
        if (err) {
            console.log(err);
            // dbUserObj = err;
        }
        if (user) {
            console.log("got Admin model");
            dbUser = user;
            console.log(dbUser);
            // return dbUserObj;
            //res.json(genToken(dbUserObj));
        }
        if (dbUser) {
            if ((req.url.indexOf('authenticate') >= 0 && dbUser.roleId == 'Admin')) {
                console.log("dnfgdkg");
                next(); // To move to next middleware
                // console.log("birthday");
            } else {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": " from Admin middleWare Not Authorized"
                });
                return;
            }
        } else {
// No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": " from Admin middleWare Invalid User"
            });
            return;
        }

    });
}
exports.AuthorizeStaff = function(req, res, next){
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    User.findOne({email: key}, function (err, user) {
        var dbUser;
        if (err) {
            console.log(err);
            // dbUserObj = err;
        }
        if (user) {
            console.log("gotStaff model");
            dbUser = user;
            console.log(dbUser);
            // return dbUserObj;
            //res.json(genToken(dbUserObj));
        }
        if (dbUser) {
            if ((req.url.indexOf('authenticate') >= 0 && dbUser.roleId == 'Staff')) {
                console.log("dnfgdkg");
                next(); // To move to next middleware
                // console.log("birthday");
            } else {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": " from Staff middleWare Not Authorized"
                });
                return;
            }
        } else {
// No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": " from Staff middleWare Invalid User"
            });
            return;
        }

    });
}
exports.AuthorizeStudent = function(req, res, next){
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    User.findOne({email: key}, function (err, user) {
        var dbUser;
        if (err) {
            console.log(err);
            // dbUserObj = err;
        }
        if (user) {
            console.log("got Student model");
            dbUser = user;
            console.log(dbUser);
            // return dbUserObj;
            //res.json(genToken(dbUserObj));
        }
        if (dbUser) {
            if ((req.url.indexOf('authenticate') >= 0 && dbUser.roleId == 'Student')) {
                console.log("dnfgdkg");
                next(); // To move to next middleware
                // console.log("birthday");
            } else {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": " from Student middleWare Not Authorized"
                });
                return;
            }
        } else {
// No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": " from Student middleWare Invalid User"
            });
            return;
        }

    });
}
exports.AuthorizeTeacher = function(req, res, next){
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    User.findOne({email: key}, function (err, user) {
        var dbUser;
        if (err) {
            console.log(err);
            // dbUserObj = err;
        }
        if (user) {
            console.log("got Teacher model");
            dbUser = user;
            console.log(dbUser);
            // return dbUserObj;
            //res.json(genToken(dbUserObj));
        }
        if (dbUser) {
            if ((req.url.indexOf('authenticate') >= 0 && dbUser.roleId == 'Teacher')) {
                console.log("dnfgdkg");
                next(); // To move to next middleware
                // console.log("birthday");
            } else {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": " from Teacher middleWare Not Authorized"
                });
                return;
            }
        } else {
// No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": " from Teacher middleWare Invalid User"
            });
            return;
        }

    });
}
exports.AuthorizeExceptStudent = function(req, res, next){
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    User.findOne({email: key}, function (err, user) {
        var dbUser;
        if (err) {
            console.log(err);
            // dbUserObj = err;
        }
        if (user) {
            console.log("got all model");
            dbUser = user;
            console.log(dbUser);
            // return dbUserObj;
            //res.json(genToken(dbUserObj));
        }
        if (dbUser) {
            if ((req.url.indexOf('authenticate') >= 0 && dbUser.roleId == 'Teacher' || 'Staff' || 'Admin')) {
                console.log("dnfgdkg");
                next(); // To move to next middleware
                // console.log("birthday");
            } else {
                res.status(403);
                res.json({
                    "status": 403,
                    "message": " from all middleWare Not Authorized"
                });
                return;
            }
        } else {
// No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": " from all middleWare Invalid User"
            });
            return;
        }

    });
}