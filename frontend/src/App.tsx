import './css/App.css';
// import { getToDoInfo } from './API/nodeBackend'
import {createToDoAPI, getToDoListAPI, deleteToDoAPI,updateToDoAPI} from './API/ToDoAPI';
import { useEffect, useState } from 'react';
import { CreateToDoInterface, ToDoInterface } from './types/todo';
import ToDoCompoment from './components/ToDoCompoment';
function App() {

  //REF: https://reactjs.org/docs/forms.html#handling-multiple-inputs
  //REF: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  const [createToDoFormInfo, setCreateToDoFormInfo] = useState<CreateToDoInterface>({ title: '', textContent: ''})
  
  const handleInputChange = (event:React.FormEvent<HTMLInputElement>): void  =>{
    console.log(event.currentTarget.id, event.currentTarget.value);
    setCreateToDoFormInfo({
      ...createToDoFormInfo,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const [todos, setTodos] = useState<ToDoInterface[]>([])

  useEffect(() => {
    fetchToDoList()
  }, [])
  
  const fetchToDoList = async () => {
    try {
      const result = await getToDoListAPI();
      setTodos(result.data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  const createToDo = async (createTodoData: CreateToDoInterface): Promise<void> => {
    try {
      await createToDoAPI(createTodoData);
      fetchToDoList();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await deleteToDoAPI(id);
      fetchToDoList();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  const updateTodo = async (editedToDo:ToDoInterface): Promise<void> => {
    try {
      await updateToDoAPI(editedToDo);
      fetchToDoList();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Create new ToDo</h1>
        <form className="createToDoForm">
          <div className="textContainer">
            <label htmlFor="title">Title </label>
            <input  type="text" id="title" onChange={handleInputChange} required />
          </div>
          <div className="textContainer">
            <label htmlFor="textContent">TextContent </label>
            <input  type="text" id="textContent" onChange={handleInputChange} required />
          </div>
          <div className="textContainer">
            <button className="sendButton" onClick={() => createToDo(createToDoFormInfo)}>Add Todo</button>
          </div>
        </form>
        

        <h1>ToDo List</h1>
      
        {todos.map((toDoItem: ToDoInterface) => 
        (<ToDoCompoment key={toDoItem.id}  todo={toDoItem} deleteToDo={deleteTodo} updateTodo={updateTodo}/>))}

      </header>
    </div>
  );
}

export default App;
