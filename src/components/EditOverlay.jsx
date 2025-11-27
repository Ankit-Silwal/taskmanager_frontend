import { useState } from "react";

export function EditTaskOverlay({ currentDescription = "", currentEmergency = false, onCancel, onSave }) {
  const [description, setDescription] = useState(currentDescription);
  const [isEmergency, setIsEmergency] = useState(currentEmergency);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* MODAL CARD */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-in fade-in zoom-in-95">
        <h2 className="text-xl font-semibold">Edit Task</h2>

        {/* DESCRIPTION INPUT */}
        <div className="mt-4">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* EMERGENCY TOGGLE */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-700 font-medium">Mark as Emergency</span>

          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className={`w-12 h-6 rounded-full transition relative ${
              isEmergency ? "bg-red-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                isEmergency ? "translate-x-6" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => onSave({ description, isEmergency })}
          >
            Save Changes
          </button>

          <button
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
