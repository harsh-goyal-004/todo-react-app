import React, { useContext, useState } from "react";
import { todoContext } from "../context/TodoProvider";

function TaskContainer({ todo }) {
  const [input, setInput] = useState(todo);
  const { deleteTask, editTask, completedTask } = useContext(todoContext);
  const [editable, setEditable] = useState(false);

  return (
    <>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black w-full ${
          todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
        key={todo.id}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.complete}
          onChange={() => completedTask(todo.id)}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            editable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.complete ? "line-through" : ""}`}
          value={input.text}
          onChange={(e) => setInput(e.target.value)}
          readOnly={!editable || todo.complete}
        />
        {/* Edit, Save Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.complete) return;

            if (!editable) {
              setEditable(true);
            } else {
              editTask(input);
              setEditable(false);
            }
          }}
          disabled={todo.complete}
        >
          {editable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => deleteTask(todo.id)}
        >
          ❌
        </button>
      </div>
    </>
  );
}

export default TaskContainer;
