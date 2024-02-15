import { useEffect, useState } from "react";
import { CreateTodo } from ".//components/CreateTodo";
import { Todos } from "./components/Todos";
import { Label } from "./components/ui/label";

function App() {
  const [todos, setTodos] = useState([]);

  function fetchTodos(){
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        console.log(json);
        setTodos(json.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchTodos()
  }, []);
  

  return (
    <>
      <CreateTodo fetchTodos={fetchTodos}/>
      <Label value="Todos in Database"></Label>
      <Todos todos={todos} fetchTodos={fetchTodos} />
    </>
  );
}

export default App;
