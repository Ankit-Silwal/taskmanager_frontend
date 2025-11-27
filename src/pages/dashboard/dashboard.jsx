import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";
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

export default function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">

      {/* Blur dashboard when modals open */}
      <div className={showLogout || showCreate ? "blur-sm pointer-events-none" : ""}>

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

            <TaskList login={login} todos={todos} />
          </section>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => setShowCreate(true)}>
                    Create Task
                  </Button>
                  <Button variant="outline">View Calendar</Button>
                  <Button variant="ghost">Settings</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>

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
