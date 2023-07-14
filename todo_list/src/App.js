import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if([todos].length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
function handleSubmit(e){
    e.preventDefault(e);

    const newTodo={
        id:new Date().getTime(),
        text: todo.trim(),
        completed:false,
    }
    if(newTodo.text.length >0){
        setTodos([...todos].concat(newTodo));
        setTodo("");
    }else{
        alert("Enter valid Task");
        setTodo("");
    }
}
  
  // Add the deleteToDo code here
function deleteToDo(todoId){
 let updatedTodos=[...todos.filter(e=>e.id!==todoId)];
 setTodos(updatedTodos);
}
  
  // Add the toggleComplete code here
function toggleComplete(todoId){
    let updatedTodos=todos.map(todo=>{
        if(todo.id==todoId){
            todo.completed= !todo.completed
        }
        return todo
    })
    setTodos(updatedTodos);
}
  
  // Add the submitEdits code here
    function submitEdits(todoId){
        if(editingText.length===0) return false
        let updatedTodos=todos.map(todo=>{
            if(todo.id==todoId)
            todo.text=editingText;
            return todo
        })
        setTodos([...updatedTodos])
        setTodoEditing(null);
    }
  
return(
<div className ="App">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input type ="text" onChange={e=>setTodo(e.target.value)} value={todo} placeholder="Add a new task"/>
<button type ="submit">Add Todo</button>
</form>
{todos.map(todo=><div className="todo" key={todo.id}>
<div className="todo-text">
<input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>  
{todo.id === todoEditing ? (
<input type="text" onChange={(e) => setEditingText(e.target.value)} />
) : (
<div>{todo.text}</div>
)}
</div>
<div lassName="todo-actions">
{todo.id === todoEditing ? (
<button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
) : (
<button onClick={() => setTodoEditing(todo.id)}>Edit</button>
)}
<button onClick={()=>deleteToDo(todo.id)}>Delet</button>  
</div>
</div>
)}
</div>
);
};
export default App;
