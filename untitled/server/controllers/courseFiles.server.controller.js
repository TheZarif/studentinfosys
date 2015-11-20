/**
 * Created by Neela on 11/21/2015.
 */
/**
 * Created by IIT on 20-Nov-15.
 */
/**
 * Created by User on 19-Nov-15.
 */
/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var File = require('../models/file.server.model.js');
var CourseFile = require('../models/courseFile.server.model.js');
var fs = require('fs');
/**
 */
exports.getFileOfCourse = function(req,res){
    console.log(req.params._id +"b vbj"+req.params.fileId);
    var flag=0;
    CourseFile.findOne({courseId:req.params.courseId},function(err, row){
        if(err) res.json(err);
        else{
            for(var i=0;i<row.fileList.length;i++){
                if(row.fileList[i]._id == req.params.fileId){
                    flag = 1;
                    var path = "./uploads/";
                    var mimeType = row.fileList[i].mimetype;
                    fs.readFile(path+row.fileList[i].uniqueName, function(error, content) {
                        if (error) {
                            res.writeHead(500);
                            res.end();
                        }
                        else {
                            res.writeHead(200, { 'Content-Type': mimeType });
                            res.end(content, 'utf-8');
                        }
                    });
                }
            }
            if(flag==0) res.json("Not Found");
        }
    });
}
exports.deleteFile = function(req,res){
    fs.unlink("./uploads/"+req.params.path, function() {
        res.send ({
            status: "200",
            responseType: "deleted",
            response: "success"
        });
    });
}
exports.uploadFile=function(req,res){
    var courseFiles = new CourseFile();
    courseFiles.courseId = req.params.courseId;
    if(req.files.length){
        for(var i=0;i<req.files.length;i++){
            var file = new File();
            file.originalName = req.files[i].originalname;
            file.uniqueName = req.files[i].filename;
            file.mimetype = req.files[i].mimetype;
            file.size = req.files[i].size;
            file.destinationFolder = req.files[i].destination;
            var s = req.files[i].path.replace("\\","/");
            file.destinationPath = "./".concat(s);
            courseFiles.fileList.push(file);
        }
    }
    courseFiles.save(function(err,row) {
        if(err) res.json(err);
        else res.json(row);
    });
}


