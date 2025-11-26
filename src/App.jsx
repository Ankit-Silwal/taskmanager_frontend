import { LoginForm } from "./components/login-form";
import RegisterForm from "./components/register-form";
import Dashboard from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-96 max-w-sm">
                <LoginForm />
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-96 max-w-sm">
                <RegisterForm />
              </div>
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
