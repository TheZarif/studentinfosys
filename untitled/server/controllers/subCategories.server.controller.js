/**
 * Created by User on 17-Nov-15.
 */
/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var SubCategory     = require('../models/subCategory.server.model.js');
var Mark = require('../models/mark.server.model.js');
/**
 * Create a Category
 */
exports.create = function(req, res) {

    var subCategory = new SubCategory();
    // create a new instance of the Bear model
    subCategory.name = req.body.name;  // set the bears name (comes from the request)
    subCategory.description = req.body.description;
    subCategory.isSelected = req.body.isSelected;
    subCategory.date = req.body.date;
    subCategory.marksOutOf = req.body.marksOutOf;
    subCategory.categoryId = req.body.categoryId;
    for(var i=0;i<req.body.listOfMark.length;i++){
        subCategory.listOfMark.push(req.body.listOfMark[i]);
        console.log(req.body.listOfMark[i]);
    }
    // save the bear and check for errors
    subCategory.save(function(err) {
        if (err)
            res.send(err);

        res.json(subCategory);
    });

};

exports.update = function(req, res) {

    SubCategory.update(
        {_id: req.params._id},
        {'$set': {
            'listOfMark': req.body.listOfMark,
            'name' : req.body.name,  // set the bears name (comes from the request)
            'description' : req.body.description,
            'isSelected' : req.body.isSelected,
            'date' : req.body.date,
            'marksOutOf':req.body.marksOutOf,
            'categoryId' : req.body.categoryId
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
    SubCategory.remove({
        _id: req.params._id
    }, function(err, category) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}
exports.list = function(req, res) {
    SubCategory.find(function(err, subCategories) {
        if (err)
            res.send(err);

        res.json(subCategories);
    });
}
exports.getSubCategoriesByCategoryId = function(req, res) {
    SubCategory.find({ categoryId: req.params._id },function(err, subCategories) {
        if (err)
            res.send(err);

        res.json(subCategories);
    });
}