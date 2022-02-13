const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const fs = require('fs')
var db;
var adId;
var extension;
var imageUrl

function loginMember(email, password) {
    var collection = db.collection("member")
    var filter = {
        "email": email,
        "password": password
    }
    var userData = collection.findOne(filter)
    return userData;
}


function insertAd(req, form) {
    console.log("inside controller")
    //getting collection
    var collection = db.collection("ads")

    form.parse(req, function (err, fields, files) {
        console.log("inside formidable function")
        //collecting information about the file upload
        var oldPath = files.image.filepath; //temp location 
        extension = files.image.originalFilename.split('.').pop()

        //adding text to db
        var name = fields.name
        var description = fields.description
        var price = fields.price

        console.log("name : ", name)
        console.log("description : ", description)

        //preparing time informartion
        var timestamp = Date.now();
        var currentDateTime = new Date();

        //insert to db
        var adData = {
            'memberid': req.session.login,
            'name': name,
            'price': price,
            'description': description,
            'image': extension,
            'timestamp': timestamp,
            'adDateTime': currentDateTime
        }
        collection.insertOne(adData)
        adId = adData._id //new id generated //_id.exten ::: for eg: 123123123123.png
        //u want to show a full details of ad
        //ip: ad._id
        //u can get the advertise detail from db using ad id
        //retrieved ad, u can get ad.image (extension)
        //_id.extension

        var newFileNameName = "./public/media/" + adId + "." + extension;

        //read
        fs.readFile(oldPath, function (err, data) {
            if (err) {
                console.log("Error in upload : ", err)
                return
            }
            //write
            fs.writeFile(newFileNameName, data, function (err) {
                if (err) {
                    console.log("Error in upload2 : ", err)
                    return
                }
            })
        })
    })

}


function updateInfoPost(req, form,id,res) {
    console.log("inside controller")
    //getting collection
    var collection = db.collection("ads")

    form.parse(req, function (err, fields, files) {
        console.log("inside formidable function")
        //collecting information about the file upload
        var oldPath = files.image.filepath; //temp location 
        extension = files.image.originalFilename.split('.').pop()

        //adding text to db
        var name = fields.name
        var description = fields.description
        var price = fields.price

        console.log("name : ", name)
        console.log("description : ", description)

        //preparing time informartion
        var timestamp = Date.now();
        var currentDateTime = new Date();
        var adData = {
            $set: {
                'memberid': req.session.login,
                'name': name,
                'price': price,
                'description': description,
                'image': extension,
                'timestamp': timestamp,
                'adDateTime': currentDateTime
            }
        }

        var whereclause = {
            "_id": mongodb.ObjectId(id)
        }
        var collection = db.collection("ads")

        collection.updateMany(whereclause, adData, function (err, result) {
            if (err) {
                console.log("Err in update : ", err)
                return
            }
            res.render("member-viewads", { title: "view page", data: result, 'imageUrl': imageUrl })
        })
        
       
      //  collection.insertOne(adData)
        adId = adData._id 

        var newFileNameName = "./public/media/" + adId + "." + extension;

        //read
        fs.readFile(oldPath, function (err, data) {
            if (err) {
                console.log("Error in upload : ", err)
                return
            }
            //write
            fs.writeFile(newFileNameName, data, function (err) {
                if (err) {
                    console.log("Error in upload2 : ", err)
                    return
                }
            })
        })
    })

}


var dbController = {
    connection: function () {
        mongoClient.connect(url, function (err, database) {
            if (err) {
                console.log("Err in database server connection")
                return
            }
            db = database.db("project")
            console.log("DB Connected from member")
        })
    },
    registerMember: function (data) {
        var collection = db.collection("member")
        collection.insertOne(data, function (err, result) {
            if (err) {
                console.log("Err in adding")
                return
            }
            console.log("Added")
        })
    },
    registerAd: function (data) {
        var collection = db.collection("ads")
        collection.insertOne(data, function (err, result) {
            if (err) {
                console.log("Err in adding")
                return
            }
            console.log("Added")
        })
    },
    getUserByEmail : function(email){
        var collection = db.collection("member")
        var filter = {
            "email" : email
        }
        var userData = collection.findOne(filter)
        return userData
    },

    viewallads: function (id, res) {
        var filter = {
            "memberid": id
        }
        imageUrl = "/media/" + adId + "." + extension
        var collection = db.collection("ads")
        collection.find(filter).sort({ timestamp: -1 }).toArray(function (err, result) {
            if (err) {
                console.log("Err in view")
                return
            }
            res.render("member-viewads", { title: "view page", data: result, 'imageUrl': imageUrl })
        })
    },
    deletead: function (id, res) {
        var collection = db.collection("ads")
        var filter = {
            "_id": mongodb.ObjectId(id)
        }
        collection.deleteOne(filter, function (err, d) {
            if (err) {
                console.log("Err while deleting")
            }
            console.log("one deleted")
        })
    },
    deleteall: function (id, res) {
        var nid = id
        var collection = db.collection("ads")
        console.log(id)
        var filter = {
            "memberid": nid
        }
        console.log(filter)
        collection.deleteMany(filter, function (err, d) {
            if (err) {
                console.log("Err while deleting")
            }
            console.log("all deleted")
        })
    },
    updateInfo: function (id, res) {
        var collection = db.collection("ads")

        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id": newId
        }
        var stdata = null

        collection.find(filter).toArray(function (err, result) {
            if (err) {
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
            res.render("member-updateinfo", { data: stdata })
        })
    },
    /*
    updateInfoPost: function (req, res) {
        var id = req.body.id
        var name = req.body.name
        var description = req.body.description
        var price = req.body.price

        var frtdata = {
            $set: {
                "id": id,
                "name": name,
                "description": description,
                "price": price,
            }
        }

        var whereclause = {
            "_id": mongodb.ObjectId(id)
        }
        var collection = db.collection("ads")

        collection.updateMany(whereclause, frtdata, function (err, result) {
            if (err) {
                console.log("Err in update : ", err)
                return
            }
            res.render("member-viewads", { title: "view page", data: result, 'imageUrl': imageUrl })
        })
    },
    */
    updateprofile: function (id, res) {
        var collection = db.collection("member")

        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id": newId
        }
        var stdata = null

        collection.find(filter).toArray(function (err, result) {
            if (err) {
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
            res.render("member-updateprofile", { data: stdata })
        })
    },
    updateprofilepost: function(id,res,req){
        var collection = db.collection("member")
        var username = req.body.username
        var email = req.body.email
        var password = req.body.password
        var mobile = req.body.mobile
        var passdata = {
            $set :  {
                "username":username,
                "email":email,
                "password":password,
                "mobile":mobile
            }
        }
        var whereclause = {
            "_id" : mongodb.ObjectId(id)
        }
        collection.updateMany(whereclause,passdata, function(err, data){
            if(err)
            {
                console.log("Err in update : ", err)
                return
            }  
        })
    },   
    updatepassword: function (id, res) {
        var collection = db.collection("member")

        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id": newId
        }
        var stdata = null

        collection.find(filter).toArray(function (err, result) {
            if (err) {
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
            res.render("member-updatepassword", { data: stdata })
        })
    },

    updatepasswordpost: function(id,res,req){
        var collection = db.collection("member")
        var password = req.body.password

        var passdata = {
            $set :  {
                "password":password
            }
        }
        var whereclause = {
            "_id" : mongodb.ObjectId(id)
        }
        collection.updateMany(whereclause,passdata, function(err, data){
            if(err)
            {
                console.log("Err in update : ", err)
                return
            }  
        })
    },

    deleteAccount : function(id,req,res){
       
        var newId = mongodb.ObjectId(id)
        console.log(newId)
        console.log(id)
        var filter = {
            "_id" : newId
        }
        var adfilter = {
            "memberid" : id
        }
        var collection = db.collection("member")
        collection.deleteMany(filter,function(err,data){
            if(err){
                console.log("Err while deleting")
            }
            var adcollection=db.collection("ads")
            adcollection.deleteMany(adfilter,function(err2,res2){
                if(err2){
                    console.log("Err while deleting")
                }
                console.log("All tasks Deleted") 
            })
         //   console.log(filter)
            console.log("Account Deleted")  
        }) 
    },



    //guest
    viewAdsGuests : function(res){
        var collection = db.collection("ads")
        collection.find().sort({createdDateTime: -1 }).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("guest-viewads", {title: "view page", data : result})
        })
    },
    viewMoreInfo : function(id,res){
        var collection = db.collection("ads")
        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id": newId
        }
        collection.find(filter).sort({createdDateTime: -1 }).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("guest-getmoreinfo", {title: "view page", data : result})
        })
    }

}

module.exports = { dbController, loginMember, insertAd,updateInfoPost }