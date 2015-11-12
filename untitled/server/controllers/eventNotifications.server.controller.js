/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by User on 05-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var EventNotification     = require('../models/eventNotification.server.model.js');
//var  Role = mongoose.model('Role');

/**
 * Create a Category
 */
exports.create = function(req, res) {

    var eventNotification = new EventNotification();      // create a new instance of the Bear model
    eventNotification.creatorId = "56446693e4b0f198092495ac";
    eventNotification.type = req.body.type;
    eventNotification.description = req.body.description;
    eventNotification.subject = req.body.subject;
    eventNotification.receiverId = "dummyReceiver";
    if(req.body.fileUrl){
        eventNotification.fileUrl = req.body.fileUrl;
        eventNotification.hasFile = true;
    }
    else{eventNotification.hasFile = false;}
    eventNotification.sentDate = Date.now();
    eventNotification.eventDate = req.body.eventDate;
    // save the bear and check for errors
    eventNotification.save(function(err) {
        if (err)
            res.send(err);
        res.json(eventNotification);
    });
};

/**
 * Show the current Category
 */

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    EventNotification.findById(req.params._id, function(err, eventNotification) {
        if (err)
            res.send(err);
        eventNotification.creatorId = "56446693e4b0f198092495ac";
        eventNotification.type = req.body.type;
        eventNotification.description = req.body.description;
        eventNotification.subject = req.body.subject;
        eventNotification.receiverId = "dummyReceiver";
        if(req.body.fileUrl){
            eventNotification.fileUrl = req.body.fileUrl;
            eventNotification.hasFile = true;
        }
        else{eventNotification.hasFile = false;}
        eventNotification.eventDate = req.body.eventDate;
        // save the bear
        eventNotification.save(function(err) {
            if (err)
                res.send(err);

            res.json(eventNotification);
        });

    });
}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    EventNotification.remove({
        _id: req.params._id
    }, function(err, eventNotification) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully Notification deleted' });
    });
}

/**
 * List of Categories
 */
exports.list = function(req, res) {
    EventNotification.find(function(err, eventNotificationList) {
        if (err)
            res.send(err);

        res.json(eventNotificationList);
    });
}
exports.getNotificationsForUser = function(req, res) {
    EventNotification.find({ receiverId: req.params._id },function(err, notifications) {
        if (err)
            res.send(err);

        res.json(notifications);
    });
}