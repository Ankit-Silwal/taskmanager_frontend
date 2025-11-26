import { useState } from "react";
import api from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
export function CreateTask() {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [emergency,setEmergency]=useState(false)
  const [date,setDate]=useState("")
  const onSubmit=async ()=>{
    try{
      await api.post("/todo/create",{
        title,
        description,
        emergency
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-5">
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
          }}
          />
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
        <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        onClick={onSubmit}><Link to="/dashboard">
          Add Task
        </Link>
        </button>
      </div>
  );
}
