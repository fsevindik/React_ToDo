import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all')
  const [filteredTodos, SetfilteredTodos] = useState([]);

  // run once when tehapp start
  useEffect(() =>{
    getLocalTodos();
  },[])



  // useEffect
  useEffect(() => {
    filterHandler()
  }, [todos, status])

  // functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        SetfilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        SetfilteredTodos(todos.filter(todo => todo.completed === false))
      default:
        SetfilteredTodos(todos);
        break;
    }
  }
// save local
const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify([]))
}

const getLocalTodos = ()=> {
  if (localStorage.getItem("todos") === null){
    localStorage.setItem("todos", JSON.stringify([]))
  }else {
    let todoLocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todoLocal)
  }
}

 
  return (
    <div className="App">
      <header>
        <h1>ToDo project</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}

      />
      <TodoList 
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos} />
    </div>
  );
}

export default App;
