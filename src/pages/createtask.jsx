import { useState } from "react";
import api from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    if (!title || !title.trim()) {
      setError("Please provide title");
      return;
    }
    try {
      await api.post("/todo/post", {
        title,
        description,
        emergency,
        dueDate: date || undefined,
      });
      setError(null);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Failed to create task";
      setError(msg);
    }
  };
  return (
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-5">

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium"
          >Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="border rounded-md px-3 py-2 text-sm"
              onChange={(e)=>{
              setTitle(e.target.value)
              if (error) setError(null)
            }}
          />
            {error === "Please provide title" && (
              <div className="text-sm text-red-600 mt-1">Please provide title</div>
            )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the task"
            className="border rounded-md px-3 py-2 text-sm h-24 resize-none"
            onChange={(e)=>{
            setDescription(e.target.value)
          }}
          ></textarea>
        </div>

        {/* Emergency */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" onClick={()=>{
            if(emergency){
              setEmergency(false)
            }else{
              setEmergency(true)
            }
          }}/>
          <label className="text-sm">Mark as Emergency</label>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Due Date</label>
          <input type="date" className="border rounded-md px-3 py-2 text-sm" onChange={(e)=>{
            setDate(e.target.value)
          }}/>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          onClick={onSubmit}
        >
          Add Task
        </button>
      </div>
  );
}
