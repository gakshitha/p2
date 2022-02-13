const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
var db;


function loginMember(name, password){
   // var collection = db.collection("member")
    var filter = {
        "name" : name,
        "password" : password
    }
    if(name==='admin' && password==='admin'){
        var collection=db.collection("admin")
        var userData = collection.findOne(filter)
    return userData;
    }
}

var dbController = {
    connection : function(){
        mongoClient.connect(url, function(err, database){
            if(err)
            {
                console.log("Err in database server connection")
                return
            }
            db = database.db("project")
            console.log("DB Connected from member")
        })
    },
    viewmembers : function(res){
        var collection = db.collection("member")
        collection.find().toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("admin-viewmembers", {title: "view page", data : result})
        })
    },
    viewmemberinfo:function(id,res){
        var filter={
            "_id":mongodb.ObjectId(id)
        }
        var collection = db.collection("member")
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("admin-viewmembersinfo", {title: "view page", data : result})
        })
    },
    viewallads: function (id, res) {
        var filter = {
            "memberid": id
        }
        var collection = db.collection("ads")
        collection.find(filter).sort({ timestamp: -1 }).toArray(function (err, result) {
            if (err) {
                console.log("Err in view")
                return
            }
            res.render("admin-viewads", {title: "view page", data : result})
        })
    },
}

module.exports={dbController,loginMember}