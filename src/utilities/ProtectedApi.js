const BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {"content-type": "application/json"}
let refreshPromise = null;

export const whoAmI = async () => {
    try {
    const res = await fetch (`${BASE}/app/session-verification`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    if (res.status === 401){
        if (!refreshPromise)
            refreshPromise = handleRefresh();
        const refreshRes = await refreshPromise;
        refreshPromise = null;
        if (refreshRes.ok)
            return whoAmI();
    }
    return res.ok ? await res.text() : null;
    } catch (e) {
        return errorHandler(e);
    }
}

export const initLoginManual = async (expectedIncome) => {
    try {
        const res = await fetch (`${BASE}/app/activate-account`, //1st attempt
            {
                method: "POST",
                credentials: "include",
                headers: HEADERS,
                body: JSON.stringify(expectedIncome)
            }
        );
        if (res.status === 401){ //interceptor only runs if original request returns 401
            if (!refreshPromise)
                refreshPromise = handleRefresh(); // lock mechanism
            const refreshRes = await refreshPromise;
            refreshPromise = null;
            if (refreshRes.ok)
                return initLoginManual(expectedIncome); //ONLY IF refresh succeedded run again.
        }
        if (res.ok){ //if refresh failed, this is the original response.
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
            path: res.status === 403 || res. status === 401 ? "/login" : "/error", //If refresh failed -> status remains 401.
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
        if (res.status === 401){
            if (!refreshPromise)
                refreshPromise = handleRefresh(); // lock mechanism
            const refreshRes = await refreshPromise;
            refreshPromise = null;
            if (refreshRes.ok)
                return submitLoginManual(expenses); //ONLY IF refresh succeedded run again.
        }
        const logID = res.headers.get("X-log-ID") || null;
        const message = res.ok ? await res.text() : await res.json(); //Either error message or data
        return {
            do: "nav",
            path: res.ok ? "/app/dashboard" : res.status === 403 || res.status === 401 ? "/login" : "/error",
            message: message,
            logID: logID === null ? "Unable to retrieve log ID" : logID
        }
 
    }catch (e) {
        return errorHandler(e);
    }
}

export const fetchDashboardData = async (flag, month) => {
    try {
        const path = month ? `${BASE}/app/login?flag=${flag}&month=${month}` : `${BASE}/app/login?flag=${flag}`
        const res = await fetch (path,
            {
                method: "GET",
                credentials: "include",
            }
        )
                if (res.status === 401){
            if (!refreshPromise)
                refreshPromise = handleRefresh(); // lock mechanism
            const refreshRes = await refreshPromise;
            refreshPromise = null;
            if (refreshRes.ok)
                return fetchDashboardData(flag, month); //ONLY IF refresh succeedded run again.
        }
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
            path: res.status === 403 || res.status === 401 ? "/login" : "/error",
            message: message,
            logID: logID === null ? "Unable to retrieve log ID" : logID
        }
    } catch (e) {
        return errorHandler(e);
    }
}

const handleRefresh = async () => {
    try {
        return await fetch (`${BASE}/public/refresh`,
            {
                method: "POST",
                credentials: "include"
            }
        )
    }catch (e) {
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