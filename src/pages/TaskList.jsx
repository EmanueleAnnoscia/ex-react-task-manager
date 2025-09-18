import React, { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";
import styles from "./TasksList.module.css";

function TaskList() {
  const { tasks, loading, error } = useContext(GlobalContext);
  //------------------------variabili State--------------------------
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  //--------------FUNZIONI--------------------------------
  //funzione "valore di ricerca"
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  }
  //funzione di ordinamento
  const filteredAndSortedTasks = useMemo(() => {
    const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };

    //filtraggio case-insensitive
    const filtered = tasks.filter((t) => t.title.toLowerCase().includes(debounceSearch.toLowerCase()));

    //ordinamento
    return [...filtered].sort((a, b) => {
      let result = 0;

      if (sortBy === "title") {
        result = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        result = statusOrder[a.status] - statusOrder[b.status]
      } else if (sortBy === "createdAt") {
        result =
          new Date(a.createdAt).getTime -
          new Date(b.createdAt).getTime;
      }

      return result * sortOrder;
    })

  }, [tasks, sortBy, sortOrder, debounceSearch])

  
  //lettura iniziale dell'array tasks
  useEffect(() => {
    console.log("Tasks dal context:", tasks);
  }, [tasks]);

  //al cambiamento di search 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 300)

    return () => {
      clearTimeout(handler); //resettato fino a quando l'utente continuerà a scrivere

    }
  }, [search])



  //validazione su tasks
  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore nel recupero</p>;
  if (tasks.length === 0) return <p>Nessuna Task in corso</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LISTA DELLE TASK</h1>
      <input
        type="text"
        placeholder="Cerca qui la tua task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Nome {sortBy === "title" ? (sortOrder === 1 ? "↑" : "↓") : null} </th>
            <th onClick={() => handleSort("status")}>Stato {sortBy === "status" ? (sortOrder === 1 ? "↑" : "↓") : null}</th>
            <th onClick={() => handleSort("createdAt")}>Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "↑" : "↓") : null}</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id ?? task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
