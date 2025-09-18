import React, { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";
import styles from "./TasksList.module.css";

function TaskList() {
  const { tasks, loading, error } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1);

  //function
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  }

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
    return [...tasks].sort((a, b) => {
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

  }, [tasks, sortBy, sortOrder])


  //lettura iniziale dell'array tasks
  useEffect(() => {
    console.log("Tasks dal context:", tasks);
  }, [tasks]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore nel recupero</p>;
  if (tasks.length === 0) return <p>Nessuna Task in corso</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LISTA DELLE TASK</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick = {() => handleSort("title")}>Nome {sortBy === "title" && (sortOrder === 1 ? "↑" : "↓")} </th>
            <th onClick = {() => handleSort ("status")}>Stato {sortBy === "status" && (sortOrder === 1 ? "↑" : "↓")}</th>
            <th onClick = {() => handleSort ("createdAt")}>Data di Creazione {sortBy === "createdAt" && (sortOrder === 1 ? "↑" : "↓")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id ?? task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
