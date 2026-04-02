import { useState } from "react";
import { register } from "../api/authApi.js";

export default function RegisterPage({ setActivePage }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("TENANT");

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await register({
                username,
                email,
                password,
                role,
            });

            alert("Registration successful!");
            setActivePage("login");
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="mx-auto max-w-xl px-6 py-16">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">Register</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Create an account to start renting or listing properties.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Username
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Role
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setRole("TENANT")}
                                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                                    role === "TENANT"
                                        ? "border-slate-950 bg-slate-950 text-white"
                                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                Tenant
                            </button>

                            <button
                                type="button"
                                onClick={() => setRole("OWNER")}
                                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                                    role === "OWNER"
                                        ? "border-slate-950 bg-slate-950 text-white"
                                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                Owner
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
                        onClick={handleRegister}
                    >
                        Create Account
                    </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setActivePage("login")}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}