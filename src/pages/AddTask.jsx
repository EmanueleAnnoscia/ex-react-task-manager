import { useState, useRef } from "react"



function AddTask(){

    const [title, setTitle] = useState();

    const descriptionRef = useRef("");
    const taskTypeRef = useRef("To do");

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    function handleSubmit(e){
       e.preventDefault();

       //controllo titolo non vuoto
       if(!title.trim()){
        alert("Il titolo non può essere vuoto")
        return;
       }

       //controllo simboli speciali
       for(let char of title){
        if(symbols.includes(char)){
            alert("Il titolo non può contenere caratteri speciali")
            return;
        }
       }

       const newTask = {
        title, 
        description: descriptionRef.current.value,
        status: taskTypeRef.current.value,
        createdAt: new Date().toISOString()
       };

       console.log("Nuova Task:", newTask)
    }

    return(
        <div>
            <h2>AGGIUNGI UNA NUOVA TASK</h2>
            <form >
                <label htmlForfor="newTask">Nuova Task</label>
                <input 
                type="text" 
                placeholder="Scrivi qui la tua nuova task ..." 
                id = "newTask"
                value = {title}
                OnChange = {(e) => setTitle(e.target.value)} 
                />

                <label htmlForfor="description">Descrizione</label>
                <textarea 
                type="text" 
                placeholder="Scrivi qui la descrizione" 
                id = "newTask" 
                ref= {descriptionRef} 
                />
                
                <label htmlForfor="taskType" >Tipologia Task</label>
                <select name = "taskType" id = "taskType" ref = {taskTypeRef} defaultValue="To do" >
                    <option value="To do"> Da Fare </option>
                    <option value="Doing"> In Corso </option>
                    <option value="Done"> Fatte </option>
                </select>

                <button type="submit" onClcick = {handleSubmit}> Aggiungi task </button>
            </form>
        </div>
    );
};

export default AddTask;



// Aggiornare la pagina AddTask.jsx per contenere un form con i seguenti campi:

//     Nome del task (title) → Input controllato (useState).
//     Descrizione (description) → Textarea non controllata (useRef).
//     Stato (status) → Select non controllata (useRef), con opzioni "To do", "Doing", "Done", e valore predefinito "To do".

// Validare il campo Nome (title):

//     Il campo non può essere vuoto.
//     Non può contenere simboli speciali.
//     Se il valore è errato, mostrare un messaggio di errore.
//     Utilizzare una costante con i caratteri vietati:

// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

// Gestione del Submit del Form:

//     Al click del bottone "Aggiungi Task", il form deve SOLO stampare in console l’oggetto task con i valori inseriti (NON deve ancora essere inviata la richiesta all’API).