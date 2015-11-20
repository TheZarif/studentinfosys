/**
 * Created by User on 05-Nov-15.
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
var UserSchema = new Schema({
    // the property name
    roleId:  String,
    email : String,
    password : String,
    userName : String,
    contactNo : String,
    designation : String,
    isActive : Boolean,
    batchNo : String,
    currentSemester : String,
    studentRoll : String
});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('User', UserSchema);

