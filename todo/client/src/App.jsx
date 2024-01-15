import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';

function App() {
  const[editMode, setEditMode] = useState(false)
  const [list, setList] = useState([])
  const [task, setTask] = useState('')
  const [userId, setuserID] = useState('')

  const showTodos = async () => {
    try{
      const {data} = await axios.get('api/show/tasks')
      console.log('Data from API:', data);
      setList(data)
    } catch(errors){
      console.log(errors)
    }
  }

  const addToDo = async (e) => {
    e.preventDefault()
    try{
      const add = await axios.post('api/create/list', {task})
      if(add.status === 200){
        setTask('')
        showTodos()
      }
      console.log('Data from API:', data);
      setList(data)
    } catch(errors){
      console.log(errors)
    }
  }

  const deleteToDo = async (id) => {
    try{
      const todoDelete = await axios.delete(`api/delete/todo/${id}`)
      if(todoDelete === 200){
        await showTodos()
      }
      console.log('Data from API:', id);
      window.location.reload()
    } catch(errors){
      console.log(errors)
    }
  }

  const editTodo = async (e) => {
    e.preventDefault()
    try{
      const edit = await axios.put(`api/update/todo/${userId}`, {task})
      console.log(edit)
      if(edit.status === 200){
        setEditMode(false)
        setTask('')
        showTodos()
        window.location.reload()
      }
    } catch(errors){
      console.log(errors)
    }
  }

  const showSingleToDo = async (id) => {
    setEditMode(true)
    try{
      const {data} = await axios.get(`api/todo/${id}`)
      setTask(data.task)
      setuserID(data.id)
    } catch(errors){
      console.log(errors)
    }
  }

  useEffect(() => {showTodos()}, [])

  return (
    <>
     <h1>Nodejs react mysql</h1>
     <section className='container'>
      <div className='form' style={{paddingBottom: "50px", paddingTop: "50px"}}>
        <form onSubmit={editMode ? editTodo : addToDo}>
          <div className='form-wrapper' style={{display: "flex", justifyContent:"space-between"}}>
            <div style={{flex: 1, marginRight:"10px"}}>
              <input onChange={(e) => setTask(e.target.value)} value={task} className='form-control' type='text' placeholder='Tasks' name='task' />
            </div>
            {
              editMode ? 
                <button type="submit" style={{width: "200px", marginLeft:"10px"}} className='btn btn-succes'>Editar</button>
                :
                <button type="submit" style={{width: "200px", marginLeft:"10px"}} className='btn btn-succes'>Adicionar task</button>
            }
          </div>
        </form>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>task</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          Array.isArray(list) && list.map(d => (
          <tr key={d.id}>
            <th scope='row'>{d.id}</th>
            <td>{d.task}</td>
            <td>
              <i onClick={() => {showSingleToDo(d.id)}} className='fa-solid fa-pen-to-square' style={{color: 'green', cursor: 'pointer'}}></i>
              <i onClick={() => {deleteToDo(d.id)}} style={{color: "red", cursor:"pointer"}} className='fa-solid fa-trash-can'></i>
            </td>
          </tr>
          ))
        }
        </tbody>
      </table>

     </section>
    </>
  )
}

export default App
