import React from 'react'
import { render, screen } from '@testing-library/react'
import ToDoCompoment from '../components/ToDoCompoment'
import { ToDoInterface } from '../types/todo'

test('should show the actions of todo', () => {
  const mockTodoItem: ToDoInterface = {
    id: "mock_id",
    userId: "mock_userId",
    title: "mock_title",
    textContent: "mock_textContents",
    highlightFlag: false,
    progessStatus: "Finished",
  }
  
  render(
    <ToDoCompoment
    todo={mockTodoItem} 
    deleteToDo={function (id: string): Promise<void> {return new Promise(() => {}); }} 
    updateTodo={function (todo: ToDoInterface): Promise<void> {return new Promise(() => {}); }}  
    />
  )
  
  expect(screen.getByText("mock_title")).toBeInTheDocument()
  expect(screen.getByText("mock_textContents")).toBeInTheDocument()
  expect(screen.getByText("Finished")).toBeInTheDocument()
})