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