"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import type { Task } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const savedTasks = localStorage.getItem("smart-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // store tasks to localStorage 
  useEffect(() => {
    localStorage.setItem("smart-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
    setIsFormOpen(false)
  }

  const updateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return

    setTasks((prev) => prev.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task)))
    setEditingTask(null)
    setIsFormOpen(false)
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task,
      ),
    )
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Task Manager</h1>
          <p className="text-gray-600">Organize your tasks with AI-powered subtask suggestions</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Tasks ({tasks.length})</h2>
          <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} onToggleStatus={toggleTaskStatus} />

        {isFormOpen && (
          <TaskForm task={editingTask} onSubmit={editingTask ? updateTask : addTask} onClose={handleCloseForm} />
        )}
      </div>
    </div>
  )
}
