import React, { useState } from 'react'

    export default function TaskInput({ onSubmit }) {
      const [task, setTask] = useState('')

      const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim()) {
          onSubmit(task)
          setTask('')
        }
      }

      return (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a task for the agents..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit Task
            </button>
          </div>
        </form>
      )
    }
