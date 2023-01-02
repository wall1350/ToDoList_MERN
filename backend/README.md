# What is it

This project is a ToDo List Backend Application which fork from 
[talyssonoc/node-api-boilerplate](https://github.com/talyssonoc/node-api-boilerplate).

# Usage and Environment
## Environment setup
The attached [docker-compose.yml](./docker-compose.yml) contains the required MongoDB setup. Please use the following command to launch the MongoDB service.
```sh
$ docker-compose up
```
## How to run the server

If you want to just run the application in development mode, use the following command:

```sh
$ yarn start
```

To run the application in debug mode in a way that the execution will stop when a debugger statement is called, use:

```sh
$ yarn debug
```

## Tests

The boilerplate is prepared to run tests using Jest. We usually group the tests in folders called `__tests__` (following Jest convention) for each module of the application. To run the tests use the following command:

```sh
$ yarn test
```
## Request Example 

### Get all ToDos
GET http://localhost:3001/api/todos/

### Get a ToDo info by ID
GET http://localhost:3001/api/todos/{{todoId}}

### Create a ToDo
POST http://localhost:3001/api/todos
```json
{
    "userId":"mockUserId",
    "title":"mockTitle",
    "textContent":"mockTextContent"
}
```

### Edit a ToDo
PUT http://localhost:3001/api/todos
```json
{
    "userId":"mockUserId",
    "title":"editedTitle",
    "textContent":"editedTextContent",
    "highlightFlag":true,
    "progessStatus":"finished"
}
```

### Delete a ToDo 
DELETE http://localhost:3001/api/todos/{{todoId}}