import type { Task } from "@/types/task"
import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleStatus: (taskId: string) => void
}

export function TaskList({ tasks, onEdit, onDelete, onToggleStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  return (
    <div className="space-y-8">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
