// importar as dependências do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer as operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar nosso objeto de banco de dados para fazer as operações
// db.serialize(() => {
//   // criar tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   // inserir dados na tabela
//   const query = `
//   INSERT INTO places (
//       name,
//       image,
//       address,
//       address2,
//       state,
//       city,
//       items
//   ) VALUES (?, ?, ?, ?, ?, ?, ?);
//   `
//   const values = [
//     "Papersider",
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//     "Rua Julio Amazonas, Centro",
//     "Número 18",
//     "Santa Catarina",
//     "Porto União",
//     "Papéis e Papelão"
//   ]

//   function afterInsertDate(err) {
//     if(err) {
//       return console.log(err)
//     }
//     console.log("Cadastrado com sucesso!")
//     console.log(this)
//   }

//   //db.run(query, values, afterInsertDate)

//   // ######### consultar os dados da tabela ##########
//   // db.all(`SELECT * FROM places`, function(err, rows) {
//   //   if(err) {
//   //     return console.log(err)
//   //   }
//   //   console.log("Aqui estão seus registros: ")
//   //   console.log(rows)
//   // })

//   // ######### remover dados da tabela ##########
  // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Registro deletado com sucesso!")
  // })
// })
