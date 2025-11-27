import { Button } from "@/components/ui/button";

export function TaskItem({ task, title, desc, due, priority, onEdit, onDelete, onToggleCompleted }) {
  return (
    <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
            {priority}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>

        <div className="text-sm text-gray-700 mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!task?.completed}
            onChange={() => onToggleCompleted && onToggleCompleted(task)}
            className="w-4 h-4"
          />
          <span className="text-xs text-gray-500">{task?.completed ? 'Completed' : 'Not completed'}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit && onEdit(task)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete && onDelete(task)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
