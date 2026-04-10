const BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {"content-type": "application/json"}

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
                headers: HEADERS,
                body: JSON.stringify(user)
            }
        )
        const logID = await res.headers.get("X-log-ID") || null;
        if (res.status === 500){
            return {
                status: 500,
                message: "Internal server error",
                logID: logID === null ? "Unable to retrieve log ID" : logID
            };
        } else {
            const data = await res.json();
            return {
                status: res.status,
                message: data.message
            };
        }
    }catch (e) {
        if (e.name === "TypeError")
            return {
                do: "nav",
                path: "/error",
                message: "Network error",
                logID: null
            };
        if (e.name === "SyntaxError")
            return {
                do: "nav",
                path: "/error",
                message: "Network error",
                logID: null
            };
    }
}

export const login = async (user) => {
    try {
        const res = await fetch (
            `${BASE}/public/login`,
            {
                method: "POST",
                credentials: "include",
                headers: HEADERS,
                body: JSON.stringify(user)
            }
        )
        const logID = res.headers.get("X-log-ID") || null;
        const data = await res.json();
        const givenName = data.givenName || "";
        const surname = data.surname || "";
        const isActive = data.activated;
        if (res.status === 500 || res.status === 200){
                return {
                    do: "nav",
                    path: res.status === 200 
                        ? isActive ? "/app/dashboard" : "/app/new-user"
                        : "/error",
                    message: res.status === 200
                        ? [givenName, surname].filter(Boolean).join(" ")
                        : "Internal server error",
                    logID: logID === null ? "Unable to retrieve log ID" : logID
                };
        }
        return {
            do: "render",
            message: data.error
        }
    }catch (e) {
        if (e.name === "TypeError")
            return {
                do: "nav",
                path: "/error",
                message: "Network error",
                logID: null
            };
        if (e.name === "SyntaxError")
            return {
                do: "nav",
                path: "/error",
                message: "Network error",
                logID: null
            };
    }
}