import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const base = import.meta.env.VITE_API_URL || "";

    axios
      .get(`${base}/tasks`, { cancelToken: source.token })
      .then((res) => {
        console.log("Fetch res:", res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Richiesta annullata:", err.message);
        } else {
          console.error("Errore nel fetching:", err);
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => source.cancel("Component Unmounted");
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
