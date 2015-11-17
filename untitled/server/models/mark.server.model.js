/**
 * Created by User on 16-Nov-15.
 */
/**
 * Created by User on 16-Nov-15.
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
var MarkSchema = new Schema({
    // the property name
    studentName : String,
    studentRoll:  String,
    mark : Number

});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('Mark', MarkSchema);

