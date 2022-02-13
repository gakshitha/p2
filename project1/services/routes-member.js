const cont=require("./controller-member")

module.exports=function(member){
    member.route("/").get(cont.home)

    member.route("/register").get(cont.register)

    member.route("/registerpost").post(cont.registerpost)

    member.route("/loginverify").post(cont.loginverify)
    member.route("/loginverify").get(cont.viewcreate)

    member.route("/createad").get(cont.createad)

    member.route("/createadpost/:id").post(cont.createadpost)

  member.route("/viewads/:id").get(cont.viewallads)

    member.route("/deletead/:id").get(cont.deletead)

    member.route("/deleteall/:memberid").get(cont.deleteall)

    member.route("/deleteaccountpost/:id").get(cont.deleteaccountpost)

    member.route("/updatead/:id").get(cont.updateaddinfo)

    member.route("/updateaddinfopost/:id").post(cont.updateaddinfopost)

    member.route("/updateprofile/:id").get(cont.updateprofile)

    member.route("/updateprofilepost/:id").post(cont.updateprofilepost)

    member.route("/updatepassword/:id").get(cont.updatepassword)

    member.route("/updatepasswordpost/:id").post(cont.updatepasswordpost)

    member.route("/logout").get(cont.logout)

    member.route("/forgotpassword").get(cont.forgotpassword)

    member.route("/sendpassword").post(cont.sendpassword)


    //guest

    member.route("/member/guest").get(cont.guestlogin)

    member.route("/member/guest/:id").get(cont.guestgetmoreinfo)

    member.route("/guest/contact").get(cont.contact)

    member.route("/guest/contactpost").get(cont.contactpost)

   

}