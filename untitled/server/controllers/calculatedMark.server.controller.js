/**
 * Created by IIT on 17-Nov-15.
 */
/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var CalculateMark     = require('../models/calculatedMark.server.model.js');
var Mark = require('../models/mark.server.model.js');

exports.list = function(req, res) {
    CalculateMark.find(function(err, marks) {
        if (err)
            res.send(err);

        res.json(marks);
    });
}
exports.delete = function(req, res) {
    CalculateMark.remove({
        _id: req.params._id
    }, function(err, role) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully User deleted' });
    });
}