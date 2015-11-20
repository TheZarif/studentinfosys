/**
 * Created by User on 13-Nov-15.
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
var UserReceivesNotification     = require('../models/userReceivesNotification.server.model.js');
var EventNotification     = require('../models/eventNotification.server.model.js');
//var  Role = mongoose.model('Role');

/**
 * Create a Category
 */
exports.create = function(receiverId, eventNotificationId, eventNotification, res) {

    if(receiverId.length) {
        for (var i = 0; i < receiverId.length; i++) {
            var recieverNotification = new UserReceivesNotification();      // create a new instance of the Bear model
            recieverNotification.receiverId = receiverId[i];
            recieverNotification.eventNotificationId = eventNotificationId;
            // save the bear and check for errors
            recieverNotification.save(function (err, row) {
                if (err)
                    console.log(err);
                console.log(row);
            });
            // console.log("hurrah"+ recieverNotification);
        }
    }
    res.json(eventNotification);
};


exports.getNotificationsForUser = function(req, res) {
    var notificationlist= [];
    UserReceivesNotification.find({ receiverId: req.params._id },function(err, notifications) {
        if (err)
            res.send(err);

       else{
            console.log(notifications.length);
            var count=0;
            for(var i=0;i<notifications.length;i++){
                EventNotification.findOne({_id:notifications[i].eventNotificationId},function(err,notificationObj){
                    if(err) res.json(err);
                    else{
                        notificationlist.push(notificationObj);
                        count++;
                        if(count == notifications.length){
                            res.send(notificationlist)
                        }

                    }

                });
            }

        }
    });
}
exports.list = function(req, res) {
    UserReceivesNotification.find(function(err, list) {
        if (err)
            res.send(err);

        res.json(list);
    });
}
exports.delete = function(req, res) {
    UserReceivesNotification.remove({
        _id: req.params._id
    }, function(err, course) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully UserReceivesNotification deleted' });
    });
}



