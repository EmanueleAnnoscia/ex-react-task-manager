import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";
import styles from "./TasksList.module.css";

function TaskList() {
  const { tasks, loading, error } = useContext(GlobalContext);

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
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id ?? task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
