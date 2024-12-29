import { useContext, useEffect, useState } from "react";
import InputTask from "./components/InputTask";
import TodoProvider, { todoContext } from "./context/TodoProvider";
import TaskContainer from "./components/TaskContainer";

function App() {
  const { todos, setTodos, deleteTask } = useContext(todoContext);
  const [status, setStatus] = useState("All");

  // Save Tasks to LocalStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.length > 0) {
      const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      if (localStorageTodos) {
        setTodos(localStorageTodos);
      }
    }
  }, []);

  return (
    <>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <InputTask />
          </div>
          <div className="flex flex-wrap gap-y-3 w-full">
            <div className="w-full flex justify-center gap-10 mt-2">
              <button
                className="border-2 rounded sm:py-1 px-2  sm:px-4  bg-white text-black font-semibold text-[16px]  sm:text-lg"
                onClick={() => setStatus("All")}
              >
                All
              </button>
              <button
                className="border-2 rounded sm:py-1 px-2  sm:px-4  bg-white text-black font-semibold text-[16px] sm:text-lg "
                onClick={() => setStatus("active")}
              >
                Active
              </button>
              <button
                className="border-2 rounded sm:py-1 px-2 sm:px-4  bg-white text-black font-semibold text-[16px]  sm:text-lg"
                onClick={() => setStatus("completed")}
              >
                Completed
              </button>
            </div>

            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => {
              if (status == "All") {
                return <TaskContainer todo={todo} />;
              } else if (status === "active") {
                return !todo.complete ? <TaskContainer todo={todo} /> : null;
              } else if (status === "completed") {
                return todo.complete ? <TaskContainer todo={todo} /> : null;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
