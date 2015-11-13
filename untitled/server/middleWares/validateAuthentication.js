/**
 * Created by IIT on 12-Nov-15.
 */
var jwt = require('jwt-simple');
var User  = require('../models/user.server.model.js');
var token;var key;
exports.isAuthenticatedAdmin = function(req, res, next) {
    token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (token || key) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "from middleWare Token Expired"
                });
                return;
            }
// Authorize the user to see if s/he can access our resources
            User.findOne({email: key}, function (err, user) {
                var dbUser;
                if (err) {
                    console.log(err);
                    // dbUserObj = err;
                }
                if (user) {
                    console.log("got model");
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
                            "message": " from middleWare Not Authorized"
                        });
                        return;
                    }
                } else {
// No user with this name exists, respond back with a 401
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": " from middleWare Invalid User"
                    });
                    return;
                }

            });
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