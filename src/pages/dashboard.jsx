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
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="outline" size="sm">
          Done
        </Button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const sampleTasks = [
    {
      title: "Write project spec",
      desc: "Draft the initial spec for the app.",
      due: "Nov 30",
      priority: "High",
    },
    {
      title: "Set up DB",
      desc: "Create tables and seed data.",
      due: "Dec 3",
      priority: "Medium",
    },
    {
      title: "Design auth",
      desc: "Finalize login/register screens.",
      due: "Dec 1",
      priority: "Low",
    },
  ];

  const importantTasks = [
    {
      title: "Pay invoices",
      desc: "Send invoices to clients.",
      due: "Nov 28",
      priority: "Urgent",
    },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [login, setLogin] = useState(false);
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setLogin(token !== null);
    } catch (err) {
      console.error("Could not access localStorage", err);
      setLogin(false);
    }
  }, []);
  console.log(login)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">TaskManager</div>
          <div className="text-sm text-gray-500">
            Your personal todo dashboard
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Replace with auth-aware UI: show user when logged in, otherwise show Login */}
          <div className="text-sm text-gray-600">Not logged in</div>
          <Button size="sm" variant="ghost"><Link to='/login'>
            Login
            </Link>
          </Button>
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
              <CardDescription>
                All your tasks are listed below. Replace with dynamic data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleTasks.map((t, i) => (
                  <TaskItem
                    key={i}
                    title={t.title}
                    desc={t.desc}
                    due={t.due}
                    priority={t.priority}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Tasks</CardTitle>
              <CardDescription>
                Quick access to high-priority items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {importantTasks.map((t, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-xs text-red-600">{t.priority}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{t.desc}</div>
                    <div className="text-xs text-gray-400 mt-2">
                      Due: {t.due}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
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
