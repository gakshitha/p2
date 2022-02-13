const dbController=require("./db-admin")
//const emailController=require("./mail-service")
dbController.dbController.connection()
var loginuser;

var contr={
    home:function(req,res){
        res.render("adminlogin")
    },
    loginverify : async function(req,res){
        var name = req.body.name
        var password = req.body.password

        var data = await dbController.loginMember(name, password)
        if (data != null)
        {   
            req.session.login=true
            loginuser=req.session.login
            res.render("adminhomepage", {title : "Member Home Page", data : data})
        }
        else
        {
            res.render("adminlogin", {title : "Member Login Page"})
        }
    },
    viewmembers : function(req,res){
        dbController.dbController.viewmembers(res)
    },
    back:function(req,res){
        res.redirect("/admin/viewmembers")
    },
    viewmemberinfo:  function(req,res){
        var id=req.params.id
        dbController.dbController.viewmemberinfo(id,res)
    },
    viewallads: function (req, res) {
        var id = req.params.id
        dbController.dbController.viewallads(id, res)
    },
    contact: function (req, res) {
        res.redirect("/admin/viewmembers")
    },
    contactpost:function(req,res){
        var email=req.body.toemail
        //emailController.send(email, "gakshitha.512@gmail.com", "Regarding Ad", "can you send more details abt ad") 
    },

    logout: function(req,res){
        req.session.destroy( function(err){
            console.log("admin session destroyed")
        })  
       // res.render("adminlogin", {title : "Member Login Page"})
       res.redirect("/admin")
    }
}

module.exports=contr