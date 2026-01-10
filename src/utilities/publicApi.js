const BASE = import.meta.env.VITE_API_BASE;

export const checkUsername = async (username) => {
    try {
        const res = await fetch (
            `${BASE}/public/check-username?username=${encodeURIComponent(username)}`,
            { method: "GET", headers: {"Accept": "application/json"} }
        )
        if (res.status === 500){
            const logID = await res.headers.get("X-log-ID") || null;
            console.error({ message: "internal server error", logID })
            return null;
        }
        return await res.json();
    }catch (e) {
        console.error({ message: "Unable to reach server", details: e.message })
        return null;
    }
}

export const register = async (user) => {
    try {
        const res = await fetch (
            `${BASE}/public/register`,
            {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: user
            }
        )
        if (res.status === 500){
            const logID = await res.headers.get("X-log-ID") || null;
            return {
                status: 500,
                message: "Internal server error",
                logID: logID === null ? "Unable to retrieve log ID" : logID
            };
        } else {
            return await res.json();
        }
    } catch (e) {
        return {
            status: "NETWORK",
            message: "Network error",
            details: e.message
        };
    }
    
}