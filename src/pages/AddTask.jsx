function AddTask(){

    return(
        <div>
            <h2>AGGIUNGI UNA NUOVA TASK</h2>
            <form >
                <input type="text" placeholder="Scrivi qui la tua nuova task ..." />
                <button type="submit" > Aggiungi </button>
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