import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/services/mutation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Login() {
  const loginMutation = useLogin();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.isAdmin == true) {
      navigate("/admin"); // Redirect to products if logged in
    }
    if (user && user?.isAdmin == false) {
      navigate("/products"); // Redirect to products if logged in
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    loginMutation.mutate(formData, {
      onSuccess: (response) => {
        console.log("Login Success:", response.data);
        setUser(response.data); // Assuming data.user contains the user information
        // Optionally redirect here
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "An unknown error occurred.";

        toast.error(errorMessage);

        console.error("Login failed:", errorMessage);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="someone@gmail.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="**********" />
              </div>
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
