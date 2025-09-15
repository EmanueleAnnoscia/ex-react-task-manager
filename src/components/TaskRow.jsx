import React from "react";
import styles from "./TaskRow.module.css";

function TaskRow({ task }) {
  let statusClass;

  switch (task.status) {
    case "To do":
      statusClass = styles.statusToDo;
      break;
    case "Doing":
      statusClass = styles.statusDoing;
      break;
    case "Done":
      statusClass = styles.statusDone;
      break;
    default:
      statusClass = "";
  }

  return (
    <tr className={styles.row}>
      <td>{task.title}</td>
      <td className={statusClass}>{task.status}</td>
      <td>{task.createdAt}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
