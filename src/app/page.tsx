"use client";

import { useState } from "react";
import { Trash2, Check } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);

    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Todo List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border text-2xl text-gray-900 border-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-black px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer flex-1 ${
                  todo.completed
                    ? "line-through text-red-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>

              {/* Check Icon */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className="text-green-600 hover:text-green-800 mr-3"
              >
                <Check size={20} />
              </button>

              {/* Trash Icon */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-800 mt-6">
            No tasks yet. Add one
          </p>
        )}
      </div>
    </main>
  );
}
