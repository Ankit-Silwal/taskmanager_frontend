import { LoginForm } from "./components/login-form";
import RegisterForm from "./components/register-form";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
