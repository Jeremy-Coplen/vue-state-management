require("dotenv").config()
const express = require("express")
const session = require("express-session")

let user = {
    name: "Jeremy",
    age: 23,
    job: "Web Developer",
    salary: 80000
}

const app = express()

const {
    SERVER_PORT,
    SECRET
} = process.env

const port = SERVER_PORT || 3005

app.set("trust proxy", 1)

app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

app.get("/api/get/user", (req, res) => {
    try {
        res.status(200).send(user)
    }
    catch(err) {
        console.log(err)
        res.status(500).send("Error getting user")
    }
})

app.put("/api/update/user", (req, res) => {
    try {
        const { updatedUser } = req.body

        user = updatedUser

        res.status(200).send("Successfully updated user re-routing to home page")
    }
    catch(err) {
        console.log(err)
        res.status(500).send("Error updating user")
    }
})

try {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}
catch(err) {
    throw new Error(err)
}