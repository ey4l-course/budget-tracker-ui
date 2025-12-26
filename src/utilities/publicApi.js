const BASE = import.meta.env.VITE_API_BASE;

export const checkUsername = async (username) => {
    try {
        const res = await fetch (
            `${BASE}/check-username?username=${encodeURIComponent(username)}`,
            { method: "GET", headers: {"Accept": "application/json"} }
        )
        if (res.status === 500){
            const logID = await res.headers.get("X-log-ID") || null;
            console.error({ message: "internal server error", logID })
            return null;
        }
        return await res.json(); // Expected {"username": "johndoe", "message":"available/taken/invalid"}
    }catch (e) {
        console.error({ message: "Unable to reach server", details: e.message })
        return null;
    }
}