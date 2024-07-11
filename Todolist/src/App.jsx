import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

import Navbar from "./components/Navbar";

function App() {
  const [todo, settodo] = useState("");
  const [listupdate,setAppdate]=useState(false)

  const [todos, setTodos] = useState([]); // Initialize as an array

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos!==null) {
      setTodos(savedTodos);
    }
    if(listupdate){
    localStorage.setItem("todos" , JSON.stringify(todos));
    setAppdate(false);
    }

  }, [listupdate]);
  

  // const savelocal = (params)=>{

    //  localStorage.setItem("todos" , JSON.stringify(todos))
      
  // }

  const handleChange = (event) => {
    settodo(event.target.value);
    
  };

  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4(), todo ,isCompleted: false }]);
    settodo("");

    setAppdate(true)
    
  };

  const handlecheckbox = (e) =>{

    let id = e.target.name;
    
  let index =   todos.findIndex(item=>{
        return item.id === id;
    })

   let newtodo = [...todos] 

   newtodo[index].isCompleted = !newtodo[index].isCompleted

   setTodos(newtodo)
   savelocal();
  }

  const handledit = (e , id) => {

       let t = todos.filter(item=>item.id === id);

       settodo(t[0].todo)

       let newtods =todos.filter(item=> item.id != id)

      setTodos(newtods);
      savelocal();
  };

  const handledel = (id) => {
    
      let newtods =todos.filter(item=> item.id !== id)

      setTodos(newtods);
      savelocal();
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto w-1/2 my-5 bg-violet-300 py-3 rounded-xl ">
      <h2 className="text-lg font-bold mx-4">Add a Todo</h2>
        <div className="addtodo m-3">
         
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="mx-1 w-1/2 px-3 py-1 rounded-xl"  
          />
          <button
            onClick={handleAdd}
            className="bg-violet-900 text-sm text-white p-3 py-1 rounded-md mx-3"
          >
            Add
          </button>
        </div>

        <h2 className="text-xl font-bold m-2">Your Todo</h2>

        <div className="  todos  m-2">

          {todos.map(item=>{
             
          return <div key={item.id} className="todo flex my-3 w-1/2 justify-between">


            <div className="flex gap-3">
            <input type="checkbox" name={item.id} value={item.isCompleted} onChange={handlecheckbox} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="btn flex h-full">
              <button onClick={(e)=>handledit(e ,item.id)} className="bg-violet-900 text-sm text-white p-3 py-1 rounded-md mx-2 " >
                Edit
              </button>
              <button  onClick={()=>handledel(item.id )} className="bg-violet-900 text-sm text-white p-3 py-1 rounded-md mx-1 ">
                Delete
              </button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  );
}

export default App;
