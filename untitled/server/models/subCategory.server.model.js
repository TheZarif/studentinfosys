/**
 * Created by User on 13-Nov-15.
 */
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
var SubCategorySchema = new Schema({
    // the property name
    name : String,
    description : String,
    isSelected : Boolean,
    date : Date,
    categoryId : String,
    marksOutOf : Number
});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('SubCategory', CategorySchema);

