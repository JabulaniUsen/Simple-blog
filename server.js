const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(function (req, res, next) {
    res.locals.error = []
    next()
})

app.get("/", (req, res) => {
    res.render("homepage")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/register", (req, res) => {
    const error = []

    if (typeof req.body.username !== "string") req.body.username = "" 
    if (typeof req.body.password !== "string") req.body.password = "" 

    req.body.username = req.body.username.trim()

    if (!req.body.username) error.push("You must provide a username.")
    if (req.body.username && req.body.username.length < 3) error.push("Username must be atleast 3 characters")
    if (req.body.username && req.body.username.length > 10) error.push("Username cannot exceed 10 characters")
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) error.push("Username can only contain letters and numbers")

    if (!req.body.password) error.push("You must provide a password.")
    if (req.body.password && req.body.password.length < 12) error.push("password must be atleast 3 characters")
    if (req.body.password && req.body.password.length > 70) error.push("password cannot exceed 10 characters")

    if (error.length) {
        return res.render("homepage", {error})
    } else {
        res.send("Thank you bro")
    }
})

app.listen(3000)