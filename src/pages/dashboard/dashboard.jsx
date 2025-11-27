import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";
import { EditTaskOverlay } from "@/components/EditTaskOverlay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/utils/axiosInstance";
import { LogoutOverlay } from "@/components/LogoutOverlay";
import { CreateTaskOverlay } from "../createtaskoverlay";
import { Edit } from "lucide-react";

export default function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit,setShowEdit]=useState(false)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [date, setDate] = useState("");
  const [taskError, setTaskError] = useState(null);

  // Login state
  const [login, setLogin] = useState(() => {
    try {
      return localStorage.getItem("token") !== null;
    } catch {
      return false;
    }
  });

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  // Prevent API from calling when user is NOT logged in
  const [editingId, setEditingId] = useState(null);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    if (!login) return;

    const fetchTodos = async () => {
      try {
        const res = await api.get("/todo/getall");
        setTodos(res.data.todos || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching todos", err);
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch todos";
        setError(msg);
      }
    };

    fetchTodos();
  }, [login]);

  // Create Task Submit
  const onSubmitCreateTask = async () => {
    if (!title.trim()) {
      setTaskError("Please provide title");
      return;
    }
    try {
      await api.post("/todo/post", {
        title,
        description,
        emergency,
        dueDate: date || undefined,
      });

      // Reset fields
      setTitle("");
      setDescription("");
      setEmergency(false);
      setDate("");
      setTaskError(null);

      setShowCreate(false);
      window.location.reload(); // refresh tasks
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to create task";
      setTaskError(msg);
    }
  };

  
  const openEdit = (task) => {
    if (!task) return;
    setEditingId(task._id || null);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setEmergency(!!task.emergency);
    setDate(task.dueDate || "");
    setEditError(null);
    setShowEdit(true);
  };

  const onSubmitEdit = async () => {
    if (!title.trim()) {
      setEditError("Please provide title");
      return;
    }

    try {
      
      await api.put(`/todo/put/${editingId}`, {
        title,
        description,
        emergency,
        dueDate: date || undefined,
      });
      setShowEdit(false);
      setEditingId(null);
      setEditError(null);
      // refresh todos
      const res = await api.get("/todo/getall");
      setTodos(res.data.todos || []);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to update task";
      setEditError(msg);
    }
  };

  

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">

      {/* Blur dashboard when modals open */}
      <div className={showLogout || showCreate || showEdit ? "blur-sm pointer-events-none" : ""}>

        {/* HEADER */}
        <Header login={login} onLogout={() => setShowLogout(true)} />

        {error && (
          <div className="max-w-7xl mx-auto mt-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* MAIN BODY */}
        <main className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT SIDE */}
          <section className="lg:col-span-3 space-y-6">

            <Stats todos={todos} />

            <TaskList login={login} todos={todos} onEdit={openEdit} onDelete={async (task) => {
              
              if (!task?._id) return;
              try {
                // try conventional delete path first
                await api.delete(`/todo/delete/${task._id}`);
              } catch (err) {
                // if 404 try alternative
                if (err?.response?.status === 404) {
                  try {
                    await api.delete(`/todo/${task._id}`);
                    } catch (error_) {
                      console.error("Delete failed (alt)", error_);
                    return;
                      }
                } else {
                  console.error("Delete failed", err);
                  return;
                }
              }
              const res = await api.get("/todo/getall");
              setTodos(res.data.todos || []);
            }} onToggleCompleted={async (task) => {
              if (!task?._id) return;
              try {
                
                await api.put(`/todo/put/${task._id}`, { completed: !task.completed });
                const res = await api.get("/todo/getall");
                setTodos(res.data.todos || []);
              } catch (err) {
                console.error("Toggle completed failed", err);
              }
            }} />
          </section>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setShowCreate(true)}>Create Task</Button>
                    <Button variant="ghost">Settings</Button>
                  </div>
                </CardContent>
            </Card>
          </aside>
        </main>
      </div>
      {showEdit && (
        <EditTaskOverlay
          title={title}
          description={description}
          emergency={emergency}
          date={date}
          error={editError}
          setTitle={setTitle}
          setDescription={setDescription}
          setEmergency={setEmergency}
          setDate={setDate}
          onSubmit={onSubmitEdit}
          onCancel={() => setShowEdit(false)}
        />
      )}

      {/* Logout Overlay */}
      {showLogout && (
        <LogoutOverlay
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            localStorage.removeItem("token");
            setLogin(false);
            setShowLogout(false);
          }}
        />
      )}

      {/* CreateTask Overlay */}
      {showCreate && (
        <CreateTaskOverlay
          title={title}
          description={description}
          emergency={emergency}
          date={date}
          error={taskError}
          setTitle={setTitle}
          setDescription={setDescription}
          setEmergency={setEmergency}
          setDate={setDate}
          onSubmit={onSubmitCreateTask}
          onCancel={() => setShowCreate(false)}
        />
      )}

    </div>
  );
}
