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
var FileSchema = new Schema({
// the property name
    originalName : String,
    uniqueName : String,
    mimetype : String,
    size : Number,
    destination : String,
    descriptionFolder : String,
    destinationPath : String
});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('File', FileSchema);

