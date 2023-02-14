const express = require("express")
const path = require("path")

const app = express()

// public access
app.use(express.static(path.join(__dirname, 'public')))

//Adding url encoders
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const main = require("./routes/main")
app.use('/api/v1/' , main)

const home = require("./routes/home")
app.use("/" , home)

app.get("/" , (req,res) => {
    res.render("index.ejs")
})

const port = process.env.PORT || 3456
app.listen(port , ()=>{
    console.log("http://127.0.0.1:" + port);
})
