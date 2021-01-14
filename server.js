const express = require("express")
const db = require("./database")

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.json({
        message: "Hello World!!"
    })
})


server.listen(6000, () => {
    console.log("your server has started");
})