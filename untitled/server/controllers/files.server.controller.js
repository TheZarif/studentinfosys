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
var EventNotification     = require('../models/eventNotification.server.model.js');
var fs = require('fs');
/**
 */
exports.getFileOfNotification = function(req,res){
    console.log(req.params.notificationId +"b vbj"+req.params.fileId);
    var flag=0;
    EventNotification.findOne({_id:req.params.notificationId},function(err, event){
        if(err) res.json(err);
        else{
            for(var i=0;i<event.fileList.length;i++){
                if(event.fileList[i]._id == req.params.fileId){
                    flag = 1;
                    var path = "./uploads/";
                    var mimeType = event.fileList[i].mimetype;
                    fs.readFile(path+event.fileList[i].uniqueName, function(error, content) {
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
exports.check=function(req,res){

}


