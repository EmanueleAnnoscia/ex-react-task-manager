import { NavLink } from "react-router-dom";

function Navbar(){
    return (
        <nav Style = {{marginBottom: "20px"}}>
            <NavLink to = "/" style= {{marginRight: "10px"}}>Lista delle Task</NavLink>
            <NavLink to = "/add">Aggiungi Task</NavLink>
        </nav>
    )
}