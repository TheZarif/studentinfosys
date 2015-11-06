'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Role     = require('../models/role.server.model.js');
//var  Role = mongoose.model('Role');


/**
 * Create a Category
 */
exports.create = function(req, res) {

    var role = new Role();      // create a new instance of the Bear model
    role.roleType = req.body.roleType;  // set the bears name (comes from the request)

    // save the bear and check for errors
    role.save(function(err) {
        if (err)
            res.send(err);

        res.json(role);
    });

};

/**
 * Show the current Category
 */
exports.getByRoleId = function(req, res) {
    Role.findById(req.params._id, function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Role.findById(req.params._id, function(err, role) {

        if (err)
            res.send(err);

        role.roleType = req.body.roleType;  // update the bears info

        // save the bear
        role.save(function(err) {
            if (err)
                res.send(err);

            res.json(role);
        });

    });
}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    Role.remove({
        _id: req.params._id
    }, function(err, role) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}

/**
 * List of Categories
 */
exports.list = function(req, res) {
    Role.find(function(err, roles) {
        if (err)
            res.send(err);

        res.json(roles);
    });
}