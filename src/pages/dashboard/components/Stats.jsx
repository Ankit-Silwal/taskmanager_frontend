import React from "react";
import { StatCard } from "./StatCard";

export default function Stats({ todos = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Tasks" value={todos.length} />
      <StatCard title="Completed" value={todos.filter((t) => t.completed).length} />
      <StatCard title="Important" value={todos.filter((t) => t.emergency).length} />
    </div>
  );
}
