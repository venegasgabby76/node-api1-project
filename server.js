const express = require("express")
const db = require("./database")

const server = express()

// this allows us to parse request JSON bodies
server.use(express.json())

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})


server.listen(8080, () => {
    console.log("server started")
})