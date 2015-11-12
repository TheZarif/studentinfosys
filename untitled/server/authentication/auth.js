/**
 * Created by User on 12-Nov-15.
 */
var jwt = require('jwt-simple');
var User  = require('../models/user.server.model.js');
var mongoose = require('mongoose');

var auth = {
    login: function(req, res) {
        var email = req.body.email || '';
        var password = req.body.password || '';
        if (email == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        var dbUserObj;
        User.findOne({ $and:[{email: email},{password: password}]},function(err, user) {

            if (err) {
                console.log(err);
               // dbUserObj = err;
            }
            if (user) {
                console.log("got model");
                dbUserObj =  user;
                //res.json(genToken(dbUserObj));
            }
            if (!dbUserObj) { // If authentication fails, we send a 401 back
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
                return;
            }
            if (dbUserObj) {
                res.json(genToken(dbUserObj));
            }
        });
    },

    validateUser: function(username) {
// spoofing the DB response for simplicity
        var dbUserObj = { // spoofing a userobject from the DB.
            name: 'arvind',
            role: 'admin',
            username: 'arvind@myapp.com'
        };
        return dbUserObj;
    },
}
// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());
    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;