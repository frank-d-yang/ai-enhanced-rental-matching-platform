import {useState} from "react";
import {login} from "../api/authApi.js";

export default function LoginPage({setUser, setActivePage}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            console.log("login response:", data);

            const user = {
                id: data.userId,
                username: data.username,
                email: data.email,
                role: data.role
            }

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
        <div className="p-10 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Login</h2>

            <input
                className="border p-2 w-full mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2 w-full mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-4 py-2 w-full"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}