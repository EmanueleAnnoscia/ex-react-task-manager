import React from "react";
import { useReducer, useEffect } from "react"
import axios from "axios"

const initialState = {
    tasks: [],
    loading: true,
    error: null,
};

function tasksReducer(state, action) {
    // console.log(state)
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { ...state, tasks: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, tasks: [], loading: false, error: action.payload };
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload), //state.tasks elenco di tutte le task correnti a cui gli vado ad esguire il filter che avrà come condizione prendi ogni task t tienila nell'array solo se il suo id è diverso da quello che voglio elminare action.payload
            };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((t) => t.id === action.payload.id ? action.payload : t),
            };
        default:
            return state;
    }

}

function useTask() {
    const [state, dispatch] = useReducer(tasksReducer, initialState)

    useEffect(() => {
        const source = axios.CancelToken.source();
        const baseURL = import.meta.env.VITE_API_URL || "";


        axios
            .get(`${baseURL}/tasks`, { cancelToken: source.token })
            .then((res) => {
                dispatch({ type: "FETCH_SUCCESS", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ERROR", payload: err })
            });

        return () => source.cancel("Componente non caricato")
    }, []);

    const addTask = async (task) => {
        try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3001"
            const res = await axios.post(`${base}/tasks`, task);
            const data = res.data;

            if (data.success) {
                dispatch({ type: "ADD_TASK", payload: data.task });
            } else{
                throw new Error (data.message || "Errore nella creazione della Task");
            }

        }catch (error){
            console.error("Errore in addTask:", error);
            throw error.response?.data?.message ?
            new Error (error.response.data.message) :
            error;
        }

       
    };

    const removeTask = async (taskId) => {
       try {
            const base = import.meta.env.VITE_API_URL || "http://localhost:3001"
            const res = await axios.delete(`${base}/tasks/${taskId}`);

            //aggiornamento dello stato rimuovendo la task
            dispatch({ type: "REMOVE_TASK", payload: taskId });

        }catch (error){
            console.error("Errore in removeTask:", error);
            throw error.response?.data?.message ?
            new Error (error.response.data.message) :
            error;
        }
    };

    const updateTask = async (updatedTask) => {
        // esempio PUT
        const base = import.meta.env.VITE_API_URL || "";
        const res = await axios.put(`${base}/tasks/${updatedTask.id}`, updatedTask);
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
    };


    return {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        addTask,
        removeTask,
        updateTask
    };
}


export default useTask