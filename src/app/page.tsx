"use client"

import { CheckCircle2, Trash2Icon } from "lucide-react";
import { useState } from "react"
type Todos = {
  id: number;
  text: string;
  completed: boolean
}

export default function HomePage() {

  const [addTodos, setAddTodos] = useState<Todos[]>([])
  const [newTodos, setNewTodos] = useState("")

  const handleTodos = () => {
    if(!newTodos.trim()) return;

    setAddTodos([
      ...addTodos,{
        id: Date.now(),
        text: newTodos,
        completed: false
      }
    ])
    setNewTodos("")
  }

  const handleToggleTodo = (id: number) => {
    setAddTodos(
      addTodos.map((todo) => 
      todo.id === id
    ? {...todo, completed: !todo.completed}
    : todo
   )
    )
  }

  const handleDeleteTodo = (id: number) => {
    setAddTodos(addTodos.filter((todo) => todo.id !== id))
  }

  return(
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white  rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-500 text-center mb-3">
          My TodoList   </h1>
            

            {/*input section */}
            <div className="flex gap-5 mb-6">
              <input type="text"
              value={newTodos}
              onChange={(e) => setNewTodos(e.target.value)}
              placeholder="Add a todo..."
              className="flex-1 px-4 py-2 border border-gray-100 rounded-lg text-gray-500" />
              <button onClick={handleTodos}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add</button>
                       </div>

                       {/*Todo section*/}
                       <ul className="space-y-4">
                        {[...addTodos]
                        .sort((a, b) =>
                        Number(a.completed) - Number(b.completed))
                        .map((todo) => (
                          <li
                          key={todo.id} 
                          className="flex items-center uppercase justify-between bg-gray-100 rounded-2xl px-4 py-3">
                            <span
                            onClick={() => handleToggleTodo(todo.id)}
                            className={`cursor-pointer flex-1 ${
                              todo.completed 
                              ? "line-through text-red-500"
                              : "text-gray-800"
                            }`}>
                              {todo.text}
                               </span>
                              {/*check*/}
                              <button
                              onClick={() => handleToggleTodo(todo.id)}
                              className={`mr-2 ${
                                todo.completed
                                ? "text-green-500 hover:tetx-green-600"
                                : "text-gray-400 hover:text-gray-600"
                              }`}>
                                <CheckCircle2 size={24}/>
                        </button>
                        {/*deleteIcon*/}
                        <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-600 mr-3">
                          <Trash2Icon size={24} />

                        </button>
                           

                          </li>
                        ))
                        }

                       </ul>

                      {addTodos.length === 0 && (
                        <p className="text-gray-500 hover:text-600 mt-6 flex justify-center">
                          No todo yet? add one...
                        </p>
                      )}
       
      </div>


    </main>
  )
}