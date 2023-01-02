import { ToDoInterface } from '../types/todo'
import { useEffect, useState } from 'react';
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import '../css/App.css';
import '../css/Modal.css';

const ToDoCompoment = (props: { todo: ToDoInterface , 
  deleteToDo: (id: string) => Promise<void>,
  updateTodo: (todo: ToDoInterface) => Promise<void>}) => {
  const { isOpen, toggle } = useModal();
  const [editedToDo, setEditedToDo] = useState<ToDoInterface>({...props.todo})

  const handleInputChange = (event:React.FormEvent<HTMLInputElement>): void  =>{
    // console.log(event.currentTarget.name, event.currentTarget.value);

    if(event.currentTarget.name==="highlightFlag"){
      setEditedToDo({
        ...editedToDo,
        ["highlightFlag"]: event.currentTarget.value === 'true'
      })
    }
    else{
      setEditedToDo({
        ...editedToDo,
        [event.currentTarget.name]: event.currentTarget.value
      },)
    }
  }

  useEffect(() => {
    props.updateTodo(editedToDo);
  }, [editedToDo]); 


  return (
    <div className="toDoItem">
      <div className="toDoTextContainer">
        <h3 >{editedToDo.title}</h3>
        <p >{editedToDo.textContent}</p>
        <p >{editedToDo.progessStatus}</p>
      </div>

      <div className="toDoTextContainer">
        <div onClick={toggle}><img src="pen-to-square-solid.svg" alt=""  className="editBtn"/></div>
        <div onClick={() =>{props.deleteToDo(editedToDo.id);}}><img src="circle-xmark-solid.svg" alt=""  className="deleteBtn"/></div>
        
        {editedToDo.highlightFlag &&
          <div ><img src="flag-solid.svg" alt=""  className="highlightFlag"/></div>
        }

        <Modal isOpen={isOpen} toggle={toggle}>
        <form className="editToDoForm">
          <br></br>
          <div className="textContainer">
            <label htmlFor="title">Title </label>
            <input  type="text" name="title" value={editedToDo.title} onChange={handleInputChange} required />
          </div>
          
          <div className="textContainer">
            <label htmlFor="textContent">TextContent </label>
            <input  type="text" name="textContent" value={editedToDo.textContent} onChange={handleInputChange} required />
          </div>

          <div className="textContainer">
            <h3>Mark as important? </h3>
            <div> 
              True 
              <input type="radio"  name="highlightFlag" value="true" checked = {editedToDo.highlightFlag === true} onChange={handleInputChange} required />
              &nbsp;&nbsp;False 
              <input  type="radio"  name="highlightFlag" value="false" checked = {editedToDo.highlightFlag === false} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="textContainer">
          <h3>Change progess status</h3>
            <div> 
              Have not started 
              <input type="radio"  name="progessStatus" value="HAVE_NOT_STARTED" checked = {editedToDo.progessStatus === "HAVE_NOT_STARTED"} onChange={handleInputChange} required />
              &nbsp;&nbsp;Progressing 
              <input  type="radio"  name="progessStatus" value="PROGRESSING"  checked = {editedToDo.progessStatus === "PROGRESSING"} onChange={handleInputChange} required />
              &nbsp;&nbsp;Finished 
              <input  type="radio"  name="progessStatus" value="FINISHED"  checked = {editedToDo.progessStatus === "FINISHED"} onChange={handleInputChange} required />
             </div>
          </div>
          
          <br></br>

          <div className="textContainer">
            <button className="sendButton" onClick={toggle}> Close </button>
          </div>
        </form>
        </Modal>
        
      </div>
    </div>
  )
}

export default ToDoCompoment