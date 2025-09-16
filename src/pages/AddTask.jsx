import { useState, useRef } from "react"
import useTask from "../assets/customhooks/useTasks";


function AddTask() {
    //useState
    const [title, setTitle] = useState();
    //useTask
    const { addTask } = useTask()
    //useRef
    const descriptionRef = useRef("");
    const taskTypeRef = useRef("To do");


    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    async function handleSubmit(e) {
        e.preventDefault();

        //controllo titolo non vuoto
        if (!title.trim()) {
            alert("Il titolo non può essere vuoto")
            return;
        }

        //controllo simboli speciali
        for (let char of title) {
            if (symbols.includes(char)) {
                alert("Il titolo non può contenere caratteri speciali")
                return;
            }
        }

        const newTask = {
            title,
            description: descriptionRef.current.value,
            status: taskTypeRef.current.value,
        };

        try {
            await addTask(newTask);
            alert("Task creata con successo");

            setTitle("");
            descriptionRef.current.value = "";
            taskTypeRef.current.value = "To Do";

        }catch(error){
            alert("Errore:", error.message);
        }
    }

    return (
        <div>
            <h2>AGGIUNGI UNA NUOVA TASK</h2>
            <form >
                <label htmlFor="newTask">Nuova Task</label>
                <input
                    type="text"
                    placeholder="Scrivi qui la tua nuova task ..."
                    id="newTask"
                    value={title}
                    OnChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="description">Descrizione</label>
                <textarea
                    type="text"
                    placeholder="Scrivi qui la descrizione"
                    id="newTask"
                    ref={descriptionRef}
                />

                <label htmlFor="taskType" >Tipologia Task</label>
                <select name="taskType" id="taskType" ref={taskTypeRef} defaultValue="To do" >
                    <option value="To do"> Da Fare </option>
                    <option value="Doing"> In Corso </option>
                    <option value="Done"> Fatte </option>
                </select>

                <button type="submit" onClcick={handleSubmit}> Aggiungi task </button>
            </form>
        </div>
    );
};

export default AddTask;
