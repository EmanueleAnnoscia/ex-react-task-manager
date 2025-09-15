import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider, GlobalContext } from "./context/GlobalContext"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"


function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
