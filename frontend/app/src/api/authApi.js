import {request} from "./request.js";

export function login(email, password) {
    return request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password})
    });
}

export function register(data) {
    return request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data)
    });
}