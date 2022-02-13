const cont=require("./controller-app")

module.exports=function(app){
    app.route("/").get(cont.home)

}