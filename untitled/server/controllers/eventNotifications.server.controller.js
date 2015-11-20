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
var receiverNotification     = require('../controllers/receiverNotification.controller.js');
var File = require('../models/file.server.model.js');
//var  Role = mongoose.model('Role');

/**
 * Create a Category
 */
exports.create = function(req, res) {
    console.log(req.files.length);
    var eventNotification = new EventNotification();      // create a new instance of the Bear model
    eventNotification.creatorId = "56446693e4b0f198092495ac";
    eventNotification.type = req.body.type;
    eventNotification.description = req.body.description;
    eventNotification.subject = req.body.subject;
    eventNotification.receiverId = ["563b7d9f4a5df71c13d4300d","564ad58848ad557c0d50cc66"];
    if(req.files.length){
        for(var i=0;i<req.files.length;i++){
            var file = new File();
            file.originalName = req.files[i].originalname;
            file.uniqueName = req.files[i].filename;
            file.mimetype = req.files[i].mimetype;
            file.size = req.files[i].size;
            file.destinationFolder = req.files[i].destination;
            var s = req.files[i].path.replace("\\","/");
            file.destinationPath = "./".concat(s);
            eventNotification.fileList.push(file);
        }
    }
    eventNotification.sentDate = Date.now();
    eventNotification.eventDate = req.body.eventDate;
    // save the bear and check for errors
    eventNotification.save(function(err) {
        console.log(eventNotification);
    });
    console.log("bhsvsyu"+eventNotification._id);
    receiverNotification.create(eventNotification.receiverId,eventNotification._id,eventNotification,res);
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
        eventNotification.receiverId = "564505ebe55e8eec13fd3276";
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
exports.getAllFileByNotificationId = function(req,res){
    EventNotification.findOne({ _id: req.params._id },function(err, notification) {
        if (err)
            res.send(err);

        res.json(notification.fileList);
    })
}