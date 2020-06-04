const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", (reg, res) => {
	res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (reg, res) => {
	res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (reg, res) => {
	res.sendFile(__dirname + "/views/search-results.html")
})

server.listen(3000)