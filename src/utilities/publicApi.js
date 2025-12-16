import { data } from "react-router-dom";
const BASE = import.meta.env.VITE_API_BASE;

export const checkUsername = async (username) => {
    try {
        const res = await fetch (
            `${BASE}/check-username?username=${username}`,
            { method: "GET", headers: {"Content-Type": "application/json"} }
        )
        const result = { status: res.status };
        if (res.status === 400) result.message = await res.text();
        if (res.status === 500) {
            result.message = await res.text();
            result.logID = res.headers.get("X-log-ID") || null;
        }
        return result;
    }catch (e) {
        return {
            error: true,
            status: "NETWORK",
            message: "Unable to reach server",
            details: e.message
        }
    }
}