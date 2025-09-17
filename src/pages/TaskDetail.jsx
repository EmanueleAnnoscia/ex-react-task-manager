import useTask from "../assets/customhooks/useTasks";
import { useParams, useNavigate } from "react-router-dom"


function TaskDetails() {
    const { id } = useParams(); //prende l'id dalla rotta
    const { tasks, removeTask } = useTask()
    const navigate = useNavigate();


    //ricerca della task corrispondente
    const task = tasks.find((t) => t.id === Number(id));

    

    const handleRemove = async() => {
        await removeTask(task.id);
        alert("Task elminata con successo");
        navigate("/");
    }

    if (!task) return <p> Task non trovata </p>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p> <strong>Descrizione:</strong> {task.description}</p>
            <p> <strong>Stato:</strong> {task.status}</p>
            <p> <strong>Creata il:</strong> {task.createdAt}</p>
            <button onClick={handleRemove}>Elimina task</button>
        </div>

    )
}


export default TaskDetails;