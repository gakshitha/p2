const dbController = require("./db-member")
//const emailController=require("./email-service")
dbController.dbController.connection()
const formidable = require('formidable')
var loginuser;
var data;
var contr = {
    home: function (req, res) {
        res.render("index")

    },
    register: function (req, res) {
        res.render("register")
    },
    registerpost: function (req, res) {
        var memdata = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mobile: req.body.mobile
        }
        dbController.dbController.registerMember(memdata)
        console.log("Member details Added")
        res.redirect("/member")
    },
    loginverify: async function (req, res) {
        var email = req.body.email
        var password = req.body.password

        data = await dbController.loginMember(email, password)
        if (data != null) {
            req.session.login = data._id
            //  loginuser=req.session.login
            console.log(req.session.login)
            res.render("memberhomepage", { title: "Member Home Page", data: data })
        }
        else {
            res.redirect("/member")
           // res.render("index", { title: "Member Login Page" })
        }
    },



    createad: function (req, res) {
        if (req.session.login) {
            res.render("createadform", { title: "Member Home Page", data: data })
            //  res.render("createadform")
        }
    },


    createadpost: async function (req, res) {
        console.log("inside controller function")
        var form = new formidable.IncomingForm();
        dbController.insertAd(req, form)
        res.redirect("/member/loginverify")
    },
    
    updateaddinfopost: async function (req, res) {
        var id=req.params.id
        console.log("inside controller function")
        var form = new formidable.IncomingForm();
        dbController.updateInfoPost(req, form,id,res)
        res.redirect("/member/loginverify")

      //  dbController.dbController.updateInfoPost(req, res)
        console.log("Ad Data Updated")
    //    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
     //   res.redirect('back');
    },
    viewcreate: function (req, res) {
        res.render("memberhomepage", { title: "Member Home Page", data: data })
    },
    viewallads: function (req, res) {
        var id = req.params.id
        dbController.dbController.viewallads(id, res)
    },

    deletead: function (req, res) {
        var id = req.params.id
        dbController.dbController.deletead(id, res)
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('back');
        //  res.render("memberhomepage", {title : "Member Home Page", data : data})

    },
    deleteall: function (req, res) {
        var id = req.session.login
        console.log("con",id)
        dbController.dbController.deleteall(id, res)
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect("/member/loginverify")
        //  res.render("memberhomepage", {title : "Member Home Page", data : data})

    },
    updateaddinfo: function (req, res) {
        var id = req.params.id
        dbController.dbController.updateInfo(id, res)
    },

/*
    updateaddinfopost: function (req, res) {
        dbController.dbController.updateInfoPost(req, res)
        console.log("Data Updated")
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('back');
    },*/
    updateprofile: function (req, res) {
        var id = req.params.id
        dbController.dbController.updateprofile(id, res)
    },
    updateprofilepost: function (req, res) {
        var id = req.params.id
        dbController.dbController.updateprofilepost(id, res, req)
        console.log("Profile Updated")
        res.redirect("/member/loginverify")
    },
    updatepassword: function (req, res) {
        var id = req.params.id
        dbController.dbController.updatepassword(id, res)
    },

    updatepasswordpost: function (req, res) {
        var id = req.params.id
        dbController.dbController.updatepasswordpost(id, res, req)
        console.log("Password Updated")
        res.redirect("/member")
    },
    forgotpassword: function (req, res) {
        res.render("member-forgotpassword", { title: "Member Forgot Password Page" })
    },

    sendpassword: async function (req, res) {
        var email = req.body.email
        var user = await dbController.dbController.getUserByEmail(email)
        if (user == null) {
            res.send("Invalid email address")
        }
        else {
            var password = user.password
            //send this email
            //   emailController.send(email, "gakshitha.512@gmail.com", "Password Recovery", "Dear Member, your password is " + "<b>" + "Member Password:" + password + "</b>")
            res.render("member-login", { title: "Member Login Page" })
        }
    },
    deleteaccountpost : function(req,res){
        var id = req.params.id
       // var email = currlogin.email   
        console.log(id)
        //console.log(email)
        dbController.dbController.deleteAccount(id,res)
        //emailController.send(email, "gakshitha.512@gmail.com", "Account Update", "Dear Member, ayour account has been deleted")
        res.redirect("/member")
    },


    //guest

    guestlogin: function (req, res) {
        dbController.dbController.viewAdsGuests(res)
    },
    guestgetmoreinfo: function (req, res) {
        var id = req.params.id
        dbController.dbController.viewMoreInfo(id, res)
    },
    contact: function(req,res){
        res.render("guest-contactadpage", { title: "Contact Page" })
    },
    contactpost:function(req,res){
        var email=req.body.toemail
        //emailController.send(email, "gakshitha.512@gmail.com", "Regarding Ad", "can you send more details abt ad") 
    },

logout: function (req, res) {
         req.session.destroy(function (err) {
             console.log("session destroyed")
         })
         res.redirect("/member")
     }

}

module.exports = contr