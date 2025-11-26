export function CreateTask() {
  return (
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the task"
            className="border rounded-md px-3 py-2 text-sm h-24 resize-none"
          ></textarea>
        </div>

        {/* Emergency */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <label className="text-sm">Mark as Emergency</label>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Due Date</label>
          <input type="date" className="border rounded-md px-3 py-2 text-sm" />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
          Add Task
        </button>
      </div>
  );
}
