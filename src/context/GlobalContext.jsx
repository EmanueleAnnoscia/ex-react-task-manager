import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import useTask from "../assets/customhooks/useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const taskHook = useTask()

  console.log(taskHook)

  return (
    <GlobalContext.Provider value={taskHook}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
