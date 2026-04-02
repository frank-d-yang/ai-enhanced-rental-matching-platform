const BASE_URL =  "http://localhost:8080";

export async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(BASE_URL + url, {
       ...options,
       headers
    });

    if (response.status === 401) {
        console.warn("Token expired, logging out...");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // todo
        window.location.href = "/";
        return;
    }

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}