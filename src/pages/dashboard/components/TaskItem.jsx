import { Button } from "@/components/ui/button";

export function TaskItem({ task, title, desc, due, priority, onEdit, onDone }) {
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
        <div className="text-xs text-gray-400 mt-2">Due: {due}</div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit && onEdit(task)}>
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDone && onDone(task)}>
          Done
        </Button>
      </div>
    </div>
  );
}
