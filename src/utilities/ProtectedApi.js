const BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {"content-type": "application/json"}

export const whoAmI = async () => {
    try {
    const res = await fetch (`${BASE}/app/session-verification`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return res.ok ? await res.text() : null;
    } catch (e) {
        return errorHandler(e);
    }
}

export const initLoginManual = async (expectedIncome) => {
    try {
        const res = await fetch (`${BASE}/app/activate-account`,
            {
                method: "POST",
                credentials: "include",
                headers: HEADERS,
                body: JSON.stringify(expectedIncome)
            }
        )
        if (res.ok){
            const data = await res.json();
            return {
                do: "render",
                message: data
            };
        }
        const logID = res.headers.get("X-log-ID") || null;
        const message = await res.text();
        return {
            do: "nav",
            path: res.status === 403 ? "/login" : "/error",
            message: message,
            logID: logID === null ? "Unable to retrieve log ID" : logID
        }
    }catch (e) {
        return errorHandler(e);
    }
}

export const submitLoginManual = async (expenses) => {
    try {
        const res = await fetch (`${BASE}/app/update-budget-config`,
            {
                method: "POST",
                credentials: "include",
                headers: HEADERS,
                body: JSON.stringify(expenses)
            }
        )
        if (res.ok){
            const data = await res.json();
            console.log(data);
            return;
        }
        const logID = res.headers.get("X-log-ID") || null;
        const message = await res.text();
        return {
            do: "nav",
            path: res.status === 403 ? "/login" : "/error",
            message: message,
            logID: logID === null ? "Unable to retrieve log ID" : logID
        }
 
    }catch (e) {
        return errorHandler(e);
    }
}

export const fetchDashboardData = async (month) => {
    try {
        const res = await fetch (`${BASE}/app/fetch-dashboard/${month}`,
            {
                method: "GET",
                credentials: "include"
            }
        )
       if (res.ok){
            const data = await res.json();
            return {
                do: "render",
                message: data
            };
        }
        const logID = res.headers.get("X-log-ID") || null;
        const message = await res.text();
        return {
            do: "nav",
            path: res.status === 403 ? "/login" : "/error",
            message: message,
            logID: logID === null ? "Unable to retrieve log ID" : logID
        }
    } catch (e) {
        return errorHandler(e);
    }
}

const errorHandler = (e) => {
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