import { useState, useRef, useEffect } from "react"
import HoldButton from "./HoldButton"
import style from "./EditTaskModal.module.css"
import ReactDOM from "react-dom"
import Modal from "./Modal"


function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [status, setStatus] = useState(task?.status || "");

    const formRef = useRef(null);

    useEffect(() => {
        setTitle(task?.title || "");
        setDescription(task?.description || "");
        setStatus(task?.status || "");
    }, [task]);

    function handleSubmit(e) {
        e.preventDefault();


        const updatedTask = {
            ...task,
            title,
            description,
            status,
        };

        onSave(updatedTask);
    };


    return (
        <Modal
            title="Modifica Task"
            show={show}
            onClose={onClose}
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div>
                        <label>Titolo</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Descrizione</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Stato</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
        />
    );
}


export default EditTaskModal 