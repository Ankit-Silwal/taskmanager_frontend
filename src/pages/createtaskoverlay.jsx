import { Button } from "@/components/ui/button";

export function CreateTaskOverlay({
  title,
  description,
  emergency,
  date,
  error,
  setTitle,
  setDescription,
  setEmergency,
  setDate,
  onSubmit,
  onCancel
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP (blur + dim) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* MODAL */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-in fade-in zoom-in-95 space-y-5">

        <h2 className="text-xl font-semibold">Create a New Task</h2>
        <p className="text-gray-600">Add your task details below.</p>

        {/* Error */}
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="border rounded-md px-3 py-2 text-sm"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the task"
            className="border rounded-md px-3 py-2 text-sm h-24 resize-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        {/* Emergency */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={emergency}
            onChange={() => setEmergency(!emergency)}
          />
          <label className="text-sm">Mark as Emergency</label>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="border rounded-md px-3 py-2 text-sm"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onSubmit}
          >
            Add Task
          </Button>

          <Button
            className="w-full bg-gray-200 hover:bg-gray-300 text-black"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>

      </div>
    </div>
  );
}
