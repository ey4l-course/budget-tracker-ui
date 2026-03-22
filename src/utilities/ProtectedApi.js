const BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {"content-type": "application/json"}

export const whoAmI = async () => {
    const res = await fetch (`${BASE}/app/session-verification`,
        {
            method: "GET",
            credentials: "include",
            // headers: HEADERS
        }
    );
    return res.ok ? await res.text() : null;
}