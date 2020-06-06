const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
	express: server,
	noCache: true
})

server.get("/", (req, res) => {
	return res.render("index.html")
})

server.get("/create-point", (req, res) => {
	// console.log(req.query)
	return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
	// console.log(req.body)
	// return res.send('formulário enviado pelo post...')

	// inserir dados no banco de dados
	const query = `
		INSERT INTO places (
				name,
				image,
				address,
				address2,
				state,
				city,
				items
		) VALUES (?, ?, ?, ?, ?, ?, ?);
		`
  const values = [
			req.body.name,
			req.body.image,
			req.body.address,
			req.body.address2,
			req.body.nameState,
			req.body.nameCity,
			req.body.items
		]

  function afterInsertDate(err) {
    if(err) {
			console.log(err)
			return res.send("Erro no cadastro")
    }
    console.log("Cadastrado com sucesso!")
		
		return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertDate)
})

server.get("/search", (req, res) => {
	 
	// caso a pesquisa esteja vazia
	if(req.query.search === "") {
		return res.render("search-results.html")
	}


	// pegar os dados do banco de dados
	  db.all(`SELECT * FROM places WHERE city LIKE '%${req.query.search}%'`, function(err, rows) {
    if(err) {
      return console.log(err)
		}

		const total = rows.length

		// escreve a pagina com os resultados
		return res.render("search-results.html", {places: rows, total})
 		})
})

server.listen(3000)