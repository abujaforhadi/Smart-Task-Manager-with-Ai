"use client"

import { useState } from "react"
import { Calendar, Edit, Trash2, CheckCircle, Circle, Lightbulb, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleStatus: (taskId: string) => void
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const [subtasks, setSubtasks] = useState<string[]>([])
  const [isLoadingSubtasks, setIsLoadingSubtasks] = useState(false)
  const [showSubtasks, setShowSubtasks] = useState(false)

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === "pending"

  const generateSubtasks = async () => {
    setIsLoadingSubtasks(true)
    try {
      const response = await fetch("/api/generate-subtasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate subtasks")
      }

      const data = await response.json()
      setSubtasks(data.subtasks)
      setShowSubtasks(true)
    } catch (error) {
      console.error("Error generating subtasks:", error)
      setSubtasks(["Unable to generate subtasks. Please try again."])
      setShowSubtasks(true)
    } finally {
      setIsLoadingSubtasks(false)
    }
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${
        task.status === "completed" ? "opacity-75" : ""
      } ${isOverdue ? "border-red-200 bg-red-50" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button onClick={() => onToggleStatus(task.id)} className="mt-1 transition-colors">
              {task.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 hover:text-green-600" />
              )}
            </button>
            <div className="flex-1">
              <h3
                className={`font-semibold text-lg ${
                  task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.status === "completed" ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 w-8 p-0">
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-sm ${isOverdue ? "text-red-600" : "text-gray-500"}`}>
                <Calendar className="w-4 h-4" />
                {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </div>
            )}
            <Badge variant={task.status === "completed" ? "secondary" : "default"}>{task.status}</Badge>
          </div>

          {task.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              onClick={generateSubtasks}
              disabled={isLoadingSubtasks}
              className="flex items-center gap-2 bg-transparent"
            >
              {isLoadingSubtasks ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              Suggest Subtasks
            </Button>
          )}
        </div>

        {showSubtasks && subtasks.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              AI Suggested Subtasks:
            </h4>
            <ul className="space-y-1">
              {subtasks.map((subtask, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-blue-600 font-medium">{index + 1}.</span>
                  {subtask}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
