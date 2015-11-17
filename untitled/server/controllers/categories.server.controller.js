/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Category     = require('../models/category.server.model.js');
var Mark = require('../models/mark.server.model.js');
/**
 * Create a Category
 */
exports.create = function(req, res) {

    var category = new Category();
    // create a new instance of the Bear model
    category.name = req.body.name;  // set the bears name (comes from the request)
    category.description = req.body.description;
    category.weight = req.body.weight;
    category.isSelected = req.body.isSelected;
    category.date = req.body.date;
    category.hasSubCategory = req.body.hasSubCategory;
    category.courseId = req.body.courseId;
    category.marksOutOf = req.body.marksOutOf;
    for(var i=0;i<req.body.listOfMark.length;i++){
   category.listOfMark.push(req.body.listOfMark[i]);
        console.log(req.body.listOfMark[i]);
    }
    // save the bear and check for errors
    category.save(function(err) {
        if (err)
            res.send(err);

        res.json(category);
    });

};

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Category.update(
        {_id: req.params._id},
        {'$set': {
            'listOfMark': req.body.listOfMark,
            'name' : req.body.name,  // set the bears name (comes from the request)
            'description' : req.body.description,
            'weight' : req.body.weight,
            'isSelected' : req.body.isSelected,
            'date' : req.body.date,
            'hasSubCategory':req.body.hasSubCategory,
            'courseId' : req.body.courseId,
            'marksOutOf' : req.body.marksOutOf
        }},
        function(err, numAffected) {
            res.json(numAffected);
        }
    );

}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    Category.remove({
        _id: req.params._id
    }, function(err, category) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}
exports.list = function(req, res) {
    Category.find(function(err, categories) {
        if (err)
            res.send(err);

        res.json(categories);
    });
}
exports.getCategoriesByCourseId = function(req, res) {
    Category.find({ courseId: req.params._id },function(err, categories) {
        if (err)
            res.send(err);

        res.json(categories);
    });
}
exports.getAbc = function(courseId) {
    Category.find({ courseId: courseId },function(err, categories) {
        if (err)
            return err;

       else {console.log(categories);return categories;}
    });
}