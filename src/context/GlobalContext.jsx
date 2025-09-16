import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import useTask from "../assets/customhooks/useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { tasks, loading, error, addTask, removeTask, updateTask} = useTask()

  

  return (
    <GlobalContext.Provider value={{ tasks, loading, error, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
