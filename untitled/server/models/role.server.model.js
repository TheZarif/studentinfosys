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
var RoleSchema = new Schema({
    // the property name
    roleType:  String

});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('Role', RoleSchema);

