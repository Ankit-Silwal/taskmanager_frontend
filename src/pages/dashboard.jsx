import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/utils/axiosInstance";

// ─────────────────────────────────────────────
// Components
function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function TaskItem({ title, desc, due, priority }) {
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
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="outline" size="sm">Done</Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
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

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todo/getall");
        setTodos(res.data.todos);  
        
      } catch (err) {
        console.error("Error fetching todos", err);
      }
    };

    fetchTodos();
  }, []);

  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Total Tasks" value="12" />
            <StatCard title="Completed" value="5" />
            <StatCard title="Important" value="3" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>All your tasks are listed below.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">

                {!login &&
                  notLoggedTask.map((t, i) => (
                    <TaskItem
                      key={i}
                      title={t.title}
                      desc={t.desc}
                      due={t.due}
                      priority={t.priority}
                    />
                  ))}

                {login && 
                  todos.map((t) => (
                    <TaskItem
                      key={t._id}
                      title={t.title}
                      desc={t.description}
                      due={t.dueDate || "No due date"}
                      priority={t.emergency ? "Urgent" : "Normal"}
                    />
                  ))
                }

              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Tasks</CardTitle>
              <CardDescription>Quick access to high-priority items.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {notLoggedImportantTasks.map((t, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-xs text-red-600">{t.priority}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{t.desc}</div>
                    <div className="text-xs text-gray-400 mt-2">Due: {t.due}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button>Create Task</Button>
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
