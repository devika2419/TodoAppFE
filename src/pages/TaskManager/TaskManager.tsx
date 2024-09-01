import { Box } from "@mui/material"
import Navbar from "../../components/Navbar/Navbar"
import "./TaskManager.css"
import Tasks from "../../components/Tasks/Tasks"

export default function TaskManager(){
    

    return(
        <Box className="main-task-body">
             <Navbar /> 
             <Box sx={{ marginTop: '64px' }}> 
                <Tasks />
            </Box>
        </Box>
    )
}