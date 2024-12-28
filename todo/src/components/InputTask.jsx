import React, { useContext, useState } from "react";
import { todoContext } from "../context/TodoProvider";

function InputTask() {
  const [input, setInput] = useState("");
  const { createTask } = useContext(todoContext);

  function addTask() {
    if (input !== "") {
      createTask({
        id: Date.now(),
        text: input,
        complete: false,
      });
      setInput("");
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault() && addTask} className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
          onClick={addTask}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default InputTask;
