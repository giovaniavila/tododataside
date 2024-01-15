const db = require("../db/database.jsx");

//criando o banco
exports.createDB = (req, res) => {
  let q = "CREATE DATABASE todo";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(200).json("banco criado");
  });
};

//criando tabela
exports.createTable = (req, res) => {
  let q =
    "CREATE TABLE todos(id int AUTO_INCREMENT, task VARCHAR(255), PRIMARY KEY(id))";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("tabela criada");
  });
};

//criando lixeira
exports.createTableLixeira = (req, res) => {
  let q =
    "CREATE TABLE lixeira(id INT AUTO_INCREMENT, task VARCHAR(255), PRIMARY KEY(id))";
  db.query(q, (err, result) => {
    if (err) {
      throw err;
    }
    return res.status(201).json("Tabela lixeira criada");
  });
};

//criando lista
exports.createList = (req, res) => {
  const q = "INSERT INTO todos SET ?";

  const { task } = req.body;

  db.query(q, { task }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW TODOS
exports.showTodos = (req, res) => {
  const q = "SELECT * FROM todos";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW SINGLE TODO
exports.singleTodo = (req, res) => {
  const q = `SELECT * FROM todos where id=${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result[0]);
  });
};

//UPDATE TODO
exports.updateTodo = (req, res) => {
  const { task } = req.body;
  // const q = `UPDATE todolist1 SET firstName ='${firstName}' lastName ='${lastName}' where id=${req.params.id}`;
  const q = `UPDATE todos SET ? where id=${req.params.id}`;

  db.query(q, { task }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

exports.deleteSingleTodo = (req, res) => {
  const todoId = req.params.id;

  const moveQuery = `INSERT INTO lixeira SELECT * FROM todos WHERE id=${todoId}`;

  const deleteQuery = `DELETE FROM todos WHERE id=${todoId}`;

  db.query(moveQuery, (moveErr, moveResult) => {
    if (moveErr) {
      return res.json(moveErr);
    }

    db.query(deleteQuery, (deleteErr, deleteResult) => {
      if (deleteErr) {
        return res.json(deleteErr);
      }

      if (moveResult.affectedRows === 0) {
        return res.status(404).json({ error: "Todo not found" });
      }

      return res
        .status(200)
        .json({ data: "Todo moved to lixeira and deleted from todos" });
    });
  });
};
