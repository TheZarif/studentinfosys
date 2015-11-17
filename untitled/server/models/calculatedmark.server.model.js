/**
 * Created by IIT on 17-Nov-15.
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

var SumMarkSchema = new Schema({
    studentRoll : String,
    studentName : String,
    categoryName : String,
    markInPercentage : Number
});
/**
 * Category Schema
 */
var CalculatedMarkSchema = new Schema({
    // the property name
    courseId : String,
    categories : [String],
    listOfCategoryMark : [SumMarkSchema]

});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('CalculatedMark', CalculatedMarkSchema);

