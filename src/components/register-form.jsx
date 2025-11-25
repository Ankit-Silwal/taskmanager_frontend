import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import api from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function RegisterForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const onRegister = async () => {
  if (password !== checkpassword) {
    setError("Passwords do not match");
    setTimeout(() => setError(""), 2000);
    return;
  }
  try {
    const res = await api.post("/auth/register", {
      username: name,
      email,
      password,
    });

    if (!res.data.success) {
      setError(res.data.msg || "Registration failed");
      setTimeout(() => setError(""), 2000);
      return;
    }
    localStorage.setItem("token", res.data.token);
    console.log("Registered successfully!");
    setError("Registered Successfully ,Now please login");
    setTimeout(() => setError(""), 10000);
    return;
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.msg || "Something went wrong!");
    setTimeout(() => setError(""), 2000);
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </Field>
              <Field>
                <Button type="button" onClick={onRegister}>
                  Register
                </Button>
                <Button variant="outline" type="button">
                  Register with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
