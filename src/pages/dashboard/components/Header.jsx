import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header({ login, onLogout }) {
  return (
    <header className="max-w-7xl mx-auto flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">TaskManager</div>
        <div className="text-sm text-gray-500">Your personal todo dashboard</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">{login ? "Logged in" : "Log in"}</div>

        {!login && (
          <Button size="sm" variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
        )}

        {login && (
          <Button size="sm" variant="ghost" onClick={onLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
