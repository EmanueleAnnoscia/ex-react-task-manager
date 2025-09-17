import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider, GlobalContext } from "./context/GlobalContext"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
import TaskDetails from "./pages/TaskDetail"


function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path ="/task/:id" element ={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
