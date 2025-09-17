import useTask from "../assets/customhooks/useTasks";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal";
import style from "./TaskDetail.module.css"


function TaskDetails() {
    const { id } = useParams(); //prende l'id dalla rotta
    const { tasks, removeTask, updateTask } = useTask()
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false)
    const [showModal, setShowModal] = useState(false)

    //ricerca della task corrispondente
    const task = tasks.find((t) => t.id === Number(id));

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task aggiornata con successo!");
            setShowEdit(false);
        } catch (err) {
            alert(err.message || "Errore durante l'aggiornamento");
        }
    };

    const handleRemove = async () => {
        await removeTask(task.id);
        alert("Task elminata con successo");
        setShowModal(false)
        navigate("/");
    }

    if (!task) return <p> Task non trovata </p>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p> <strong>Descrizione:</strong> {task.description}</p>
            <p> <strong>Stato:</strong> {task.status}</p>
            <p> <strong>Creata il:</strong> {task.createdAt}</p>
            <button onClick={() => setShowModal(true)}>Elimina task</button>
            <button onClick={() => setShowEdit(true)}>Modifica task</button>

            <Modal
                title="Conferma eliminazione"
                content={`Sei sicuro di voler eliminare la task "${task.title}" ?`}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleRemove}
                confirmText="Elimina"
            />

            <EditTaskModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                task={task}
                onSave={handleSave}
            />
        </div>



    )
}


export default TaskDetails;