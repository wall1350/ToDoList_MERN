import axios, { AxiosResponse } from 'axios'
import { ToDoInterface,GetToDoResult, CreateToDoInterface, editToDoInterface} from '../types/todo'

const API_HOST = "http://localhost:3001";

const createToDoAPI = async (createTodoData: CreateToDoInterface): Promise<AxiosResponse<ToDoInterface>> => {
  try {
    const todoItem = {
      ...createTodoData,
      userId: "mockUserId1",
    }
    let config = {method: 'post', url: API_HOST + "/api/todos/" , headers: { }, data : todoItem};
    const response = axios(config)
    
    const result = (await Promise.resolve(response)).data;
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const getToDoListAPI = async (): Promise<GetToDoResult> => {
  try {
    const config = {method: 'get', url: API_HOST+"/api/todos/", headers: { }, data : ""};
    const result = (await Promise.resolve(axios(config))).data;
    // const result = (await Promise.resolve(response)).data;
    // console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const getToDoInfoAPI = async (toDoId:string): Promise<ToDoInterface> => {
  try {
    let config = {method: 'get', url: API_HOST + "/api/todos/" + toDoId, headers: { }, data : ""};
    const result = (await Promise.resolve(axios(config))).data;

    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const updateToDoAPI = async (editedToDoOrigin: ToDoInterface): Promise<AxiosResponse> => {
  try {
    const editToDoItem:editToDoInterface = {
      userId: editedToDoOrigin.userId,
      title: editedToDoOrigin.title,
      textContent: editedToDoOrigin.textContent,
      highlightFlag: editedToDoOrigin.highlightFlag,
      progessStatus: editedToDoOrigin.progessStatus,
    }
    let config = {method: 'put', url: API_HOST + "/api/todos/" + editedToDoOrigin.id, headers: { }, data : editToDoItem};
    const result = (await Promise.resolve(axios(config))).data;
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const deleteToDoAPI = async (toDoId: string): Promise<AxiosResponse> => {
  try {
    let config = {method: 'delete', url: API_HOST + "/api/todos/" + toDoId, headers: { }, data : ""};
    const result = (await Promise.resolve(axios(config))).data;
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { createToDoAPI, getToDoListAPI, getToDoInfoAPI, updateToDoAPI, deleteToDoAPI}