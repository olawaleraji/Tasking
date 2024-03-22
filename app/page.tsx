"use client";
import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="task-container m-6">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter task..."
        className="p-2 border-2 border-green-400 rounded-lg bg-gray-200 text-pink-500 outline-none"
      />
      <button
        onClick={handleAddTask}
        className="p-2 bg-green-500 rounded-lg text-white text-lg cursor-pointer"
      >
        Add Task
      </button>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={task.text}
                onChange={(e) => handleEditTask(task.id, e.target.value)}
                className="p-2 w-full border-none bg-transparent focus:outline-none"
              />
            </div>
            <div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-2 bg-red-500 rounded-lg text-white text-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
