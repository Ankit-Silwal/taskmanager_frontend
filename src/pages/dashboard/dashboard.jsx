import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatCard } from "./startcard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/utils/axiosInstance";
import { TaskItem } from "./taskitem";

export default function Dashboard() {

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

  const notLoggedTask = [
    {
      title: "Login sir",
      desc: "login button is on upper right.",
      due: "Login Right away",
      priority: "High",
    },
  ];

  const notLoggedImportantTasks = [
    {
      title: "Gotta Login Sir/Mam",
      desc: "The login button is on upper right.",
      due: "Login right now",
      priority: "Urgent",
    },
  ];

  // Logout
  const removeToken = () => {
    localStorage.removeItem("token");
    setLogin(false);
    console.log("Removed successfully");
  };

  // <------------------------- FIXED ------------------------->
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
        // Prefer server message when available
        const msg = err?.response?.data?.message || err.message || "Failed to fetch todos";
        setError(msg);
      }
    };

    fetchTodos();
  }, [login]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">TaskManager</div>
          <div className="text-sm text-gray-500">Your personal todo dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            {login ? "Logged in" : "Log in"}
          </div>

          {!login && (
            <Button size="sm" variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {login && (
            <Button size="sm" variant="ghost" onClick={removeToken}>
              Logout
            </Button>
          )}
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto mt-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* MAIN BODY */}
      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT SIDE */}
        <section className="lg:col-span-3 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* <------------------------- FIXED -------------------------> */}
            <StatCard title="Total Tasks" value={todos.length} />

            <StatCard title="Completed" value={todos.filter(t => t.completed).length} />

            <StatCard title="Important" value={todos.filter(t => t.emergency).length} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>All your tasks are listed below.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">

                {!login &&
                  notLoggedTask.map((t) => (
                    <TaskItem
                      key={t._id}
                      title={t.title}
                      desc={t.desc}
                      due={t.due}
                      priority={t.priority}
                    />
                  ))}

                {login &&
                  (Array.isArray(todos) ? todos : []).map((t) => (
                    <TaskItem
                      key={t._id}
                      title={t.title}
                      desc={t.description}
                      due={t.dueDate || "No due date"}
                      priority={t.emergency ? "Urgent" : "Normal"}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RIGHT SIDE */}
        <aside className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Important Tasks</CardTitle>
              <CardDescription>Quick access to high-priority items.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">

                {/* Show only when NOT logged in */}
                {!login &&
                  notLoggedImportantTasks.map((t, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-red-600">{t.priority}</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{t.desc}</div>
                      <div className="text-xs text-gray-400 mt-2">Due: {t.due}</div>
                    </div>
                  ))}

                {/* When logged in, we will add logic later */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-2">
                <Button><Link to="/createtask">Create Task</Link></Button>
                <Button variant="outline">View Calendar</Button>
                <Button variant="ghost">Settings</Button>
              </div>
            </CardContent>
          </Card>

        </aside>
      </main>
    </div>
  );
}
