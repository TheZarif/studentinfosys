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
var UserReceivesNotificationSchema = new Schema({
    // the property name
    receiverId:  String,
    eventNotificationId : String
});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('UserReceivesNotification', UserReceivesNotificationSchema);