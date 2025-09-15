import React, { createContext, useEffect, useState } from 'react'

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const source = axios.CancelToken.source();
        const base = import.meta.env.VITE_API_URL || "";


        axios.get(`${base}/tasks`, { cancelToken: source.token })
    .then(res => {
        console.log("Fetch res:", data)
        setTasks(res.data);
    })
    .catch(err => {
        console.error("Errore nel fetching:", err)
        setError(err)
    })

    .finally(() => {
        setLoading(False)
    })

    return () => source.cancel ("Component Unmounted");

    }, [])
}



