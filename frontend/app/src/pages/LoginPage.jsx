import { useState } from "react";
import { login } from "../api/authApi.js";

export default function LoginPage({ setUser, setActivePage }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {
            const data = await login(email, password);
            console.log("login response:", data);

            const user = {
                id: data.userId,
                username: data.username,
                email: data.email,
                role: data.role,
            };

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);

            if (user.role === "OWNER") {
                setActivePage("ownerDashboard");
            } else {
                setActivePage("home");
            }
        } catch (error) {
            alert("Login failed!");
        }
    };

    return (
        <div className="mx-auto max-w-xl px-6 py-10">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">Login</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to manage bookings and properties.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setActivePage("register")}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}