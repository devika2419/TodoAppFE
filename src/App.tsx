import Home from "./pages/Home/Home"
import { Route, Routes, BrowserRouter } from "react-router-dom"
// import * as React from 'react';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import TaskManager from "./pages/TaskManager/TaskManager";
import CompletedTasks from "./pages/CompletedTasks/CompletedTasks";
import PendingTasks from "./pages/PendingTasks/PendingTasks";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>}/> 
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/task-manager" element={<TaskManager />}/>
        <Route path="/completed-tasks" element={<CompletedTasks />}/>
        <Route path="/pending-tasks" element={<PendingTasks />}/>
      </Routes>
    </BrowserRouter>
    
   
  )
}

export default App
