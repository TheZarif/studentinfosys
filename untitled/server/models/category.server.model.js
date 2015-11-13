/**
 * Created by User on 13-Nov-15.
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
var CategorySchema = new Schema({
    // the property name
    name : String,
    description : String,
    weight : Number,
    isSelected : Boolean,
    date : Date,
    hasSubCategory : Boolean,
    courseId : String

});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('Category', CategorySchema);

