const express = require("express")
const server = express()

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
	express: server,
	noCache: true
})

server.get("/", (reg, res) => {
	res.render("index.html")
})

server.get("/create-point", (reg, res) => {
	res.rende("create-point.html")
})

server.get("/search-results", (reg, res) => {
	res.render("search-results.html")
})

server.listen(3000)