import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskItem } from "./TaskItem";

export default function TaskList({ login, todos = [], onEdit, onDelete, onToggleCompleted }) {
  const notLoggedTask = [
    {
      title: "Login sir",
      desc: "login button is on upper right.",
      due: "Login Right away",
      priority: "High",
    },
  ];

  return (
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
                key={t._id || t.title}
                task={t}
                title={t.title}
                desc={t.desc}
                due={t.due}
                priority={t.priority}
                onEdit={onEdit}
                onDone={onDone}
              />
            ))}

          {login &&
            (Array.isArray(todos) ? todos : []).map((t) => (
              <TaskItem
                key={t._id}
                task={t}
                title={t.title}
                desc={t.description || "No description"}
                due={t.dueDate || "No due date"}
                priority={t.emergency ? "Urgent" : "Normal"}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleCompleted={onToggleCompleted}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
