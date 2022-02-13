const cont=require("./controller-admin")

module.exports=function(admin){
    admin.route("/").get(cont.home)

    admin.route("/loginverify").get(cont.loginverify)

    admin.route("/loginverify").post(cont.loginverify)

    admin.route("/viewmembers").get(cont.viewmembers)

    admin.route("/backviewmembers").get(cont.back)

    admin.route("/:id").get(cont.viewmemberinfo)

    admin.route("/admin/logout").get(cont.logout)

    admin.route("/admin/viewads/:id").get(cont.viewallads)

    admin.route("/admin/contact/:id").get(cont.contact)

    admin.route("/admin/contactpost").post(cont.contactpost)
}