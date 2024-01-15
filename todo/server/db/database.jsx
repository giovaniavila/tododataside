const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1808",
    database: "todo"
})

db.connect(error => {
    if(error) throw error
    console.log("Banco conectado")
})

module.exports = db