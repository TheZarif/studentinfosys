/**
 * Created by Zarif on 06/11/2015.
 */

var mongoose = require('mongoose');
var User     = require('../models/user.server.model.js');
var session = require('express-session');
var sess;

exports.login = function (req, res) {
    User.find({ $and:[{email: req.body.email},{password :req.body.password}]},function(err, users) {
        if (err)
            res.send(err);
        if(users.length==0) res.status(403).send("Invalid");
        else{
            sess=req.session;
            sess.email = users[0].email;
            sess.role = users[0].roleId;
            console.log(sess.email);
            res.json(users);
        }
    });

};

exports.logout = function (req, res) {
    sess=req.session;
    var data = {
        "Data":""
    };
    sess.destroy(function(err) {
        if(err){
            data["Data"] = 'Error destroying session';
            res.json(data);
        }else{
            data["Data"] = 'Session destroy successfully';
            res.json(data);
        }
    });

};

exports.isLoggedIn = function (req, res, next) {
    sess=req.session;
    if(sess.email){
        console.log("Is logged in as : " + sess.email);
        next();
    }
    else{
        res.status(403).send("Invalid");
    }

}
