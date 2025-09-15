import React, { useContext, useEffect } from 'react';
import { GlobalContext } from ".\context\Globalontext"
 


function TaskList (){

    const { tasks, loading, error } = useContext(GlobalContext);

    useEffect(() => {
        console.log("Tasks dal context:", tasks);
    }, [tasks]);

    if(loading) return <p>Caricamento...</p>
    if(error) return <p>Errore nel recupero</p>

    return (
        <div>
            <h1>LISTA DELLE TASK</h1>
            <ul>
                {tasks.length === 0 ? (
                    <li>Nessuna Task in corso</li>
                ) : (
                    tasks.map ((task, index) => {
                        <li key = {index} > {task.title ?? task.name}</li>
                    })
                )}
            </ul>
        </div>
    )
};

export default TaskList;