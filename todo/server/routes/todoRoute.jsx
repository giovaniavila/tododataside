const express = require('express')
const { createDB, createTable, createList, showTodos, singleTodo, updateTodo, deleteSingleTodo } = require('../controllers/todoController.jsx')
const router = express.Router()

router.get('/create/database', createDB)
router.get('/create/table', createTable)
router.post('/create/list', createList)
router.get('/show/tasks', showTodos)
router.get('/todo/:id', singleTodo)
router.put('/update/todo/:id', updateTodo)
router.delete('/delete/todo/:id', deleteSingleTodo)

module.exports = router