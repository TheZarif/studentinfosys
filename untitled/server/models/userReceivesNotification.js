/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by User on 03-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Category Schema
 */
var EventNotificationSchema = new Schema({
    // the property name
    creatorId:  String,
    type : String,
    description : String,
    subject : String,
    receiverId : String,
    hasFile : Boolean,
    fileUrl : String,
    sentDate : Date,
    eventDate : Date
});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('EventNotification', EventNotificationSchema);