const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
	express: server,
	noCache: true
})

server.get("/", (reg, res) => {
	return res.render("index.html")
})

server.get("/create-point", (reg, res) => {
	return res.render("create-point.html")
})

server.get("/search", (reg, res) => {
	// pegar os dados do banco de dados
	  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
		}

		const total = rows.length

		// escreve a pagina com os resultados
		return res.render("search-results.html", {places: rows, total})
 		})
})

server.listen(3000)