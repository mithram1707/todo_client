import React, { use } from 'react';
import { useState } from 'react';
import './css/Todo.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
  const [todo, setTodo] = useState('')
  const [status, setStatus] = useState(false)
  const [todoArray, setTodoArray] = useState([]);
  console.log(todoArray);
  const postTodo = async () => {
    //create -post
    try {
      await axios.post("http://localhost:5000/csbs/addtodo", { todo })
      setTodo('')
      setStatus(true)
      getTodo()
      setTimeout(() => setStatus(true), 3000);
    } catch (err) {
      console.error(err);
    }
  }
  //read -get
  const getTodo = async () => {
    await axios.get('http://localhost:5000/csbs/gettodo')
      .then((response) => {
        setTodoArray(response.data)
      }).catch((err) => {
        console.error(err);

      })
  }
  return (
    <div className='todoList'>
      <Typography variant="h1" gutterBottom>
        Todo
      </Typography>
      <Box sx={{ width: 500, maxWidth: '100%' }} className='box'>
        <TextField fullWidth label="Enter Todo" id="todo-input " value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" className='but' onClick={postTodo}>Add Todo</Button>
        </Stack>
      </Box>

      {
        status && (
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "9999"
          }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Todo has been posted
            </Alert>
          </div>
        )
      }
      <div>
        <ul>
          {
            todoArray.map((res) => (
              <li key={res._id}><h3>{res.todo}</h3></li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default TodoList;