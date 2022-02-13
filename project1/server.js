const express = require('express')
const session = require('express-session')
var app = express()
var port = 3006
var bodyParser = require('body-parser')

//creating sub server
var admin = express()
var member = express()
var guest = express()

//mount body parser
app.use(bodyParser.urlencoded({
    extended: true
}))
admin.use(bodyParser.urlencoded({
    extended: true
}))
member.use(bodyParser.urlencoded({
    extended: true
}))
guest.use(bodyParser.urlencoded({
    extended: true
}))

//mount ejs
app.set("view engine", "ejs")
admin.set("view engine", "ejs")
member.set("view engine", "ejs")
guest.set("view engine", "ejs")

//create sessions
admin.use(session({
    secret: "admin",
    resave: true,
    saveUninitialized: true
}))

member.use(session({
    secret: "member",
    resave: true,
    saveUninitialized: true
}))
guest.use(session({
    secret: "guest",
    resave: true,
    saveUninitialized: true
}))


app.get("/stylesindex.css", function (req, res) {
    res.sendFile(__dirname + "/views/stylesindex.css")
})
member.get("/stylehome.css", function (req, res) {
    res.sendFile(__dirname + "/views/stylehome.css")
})
member.get("/memberstylehome.css", function (req, res) {
    res.sendFile(__dirname + "/views/memberstylehome.css")
})
app.get("/adminstyle.css", function (req, res) {
    res.sendFile(__dirname + "/views/adminstyle.css")
})
admin.get("/adminstylehome.css", function (req, res) {
    res.sendFile(__dirname + "/views/adminstylehome.css")
})
admin.get("/adminstyleviewmembers.css", function (req, res) {
    res.sendFile(__dirname + "/views/adminstyleviewmembers.css")
})
admin.get("/adminstyleviewmembersinfo.css", function (req, res) {
    res.sendFile(__dirname + "/views/adminstyleviewmembersinfo.css")
})
app.use("/admin", admin)
app.use("/member", member)
app.use("/guest", guest)
app.use(express.static('public'));

//var approute=require("./services/routes-app")
var adminroute = require("./services/routes-admin")
var memberroute = require("./services/routes-member")


adminroute(admin)
memberroute(member)


app.listen(port, function (err, res) {
    if (err) {
        console.log("Err in starting")
    }
    console.log("Server started at : ", port)
})