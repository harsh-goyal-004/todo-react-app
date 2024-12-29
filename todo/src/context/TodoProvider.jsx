import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const todoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  function createTask(todo) {
    setTodos((prevTodos) => [...prevTodos, todo]);
  }

  function deleteTask(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    // Clear localStorage when all tasks are deleted
    if (todos.length === 1) {
      localStorage.clear();
    }
  }

  function completedTask(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function editTask(text, id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
    );
  }

  return (
    <todoContext.Provider
      value={{
        todos,
        setTodos,
        createTask,
        deleteTask,
        completedTask,
        editTask,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

export default TodoProvider;
