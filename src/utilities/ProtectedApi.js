const BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {"content-type": "application/json"}

export const whoAmI = async () => {
    const res = await fetch (`${BASE}/app/session-verification`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return res.ok ? await res.text() : null;
}

export const initLoginManual = async (expectedIncome) => {
    if ( expectedIncome.length <=1 )
        expectedIncome = expectedIncome[0];
    try {
        const res = await fetch (`${BASE}/app/activate-account`,
            {
                method: "POST",
                credentials: "include",
                headers: HEADERS,
                body: JSON.stringify(expectedIncome)
            }
        )
        const data = await res.json();
        return data;
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
        const data = await res.json();
        console.log(data);
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
// {
//   "education": 10,
//   "housing": 30,
//   "vacations": 5,
//   "leisure": 8,
//   "groceries": 12,
//   "vehicle": 15
// }