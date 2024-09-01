import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
// import "./CompletedTasks.css"
import Navbar from "../../components/Navbar/Navbar"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface Task {
    task_id: number;
    user_id: string;
    task_desc: string;
    completed: number;
    created_at?: string;
  }
  

export default function PendingTasks(){
    const colors = ['#c7d7fb', '#f1b0da', '#fec4b6', '#ddedea','#fcf4dd'];
    const [pendingTasks, setPendingTasks] = useState<Task[]>([]);


    
    // Retrieve userId
    const location = useLocation();

    const getUserIdFromQuery=()=>{
      const params = new URLSearchParams(location.search);

      return params.get('userId') || '';
    
    }

    const userId = getUserIdFromQuery();


  
    // Retrieve tasks
    const[userTasks, setUserTasks] = useState<Task[]>([]);

    useEffect(() => {
      const fetchTasks = async () => {
        if (userId) {
          try {
            // Fetch tasks filtered by userId from the backend
            const response = await api.get<{ result: Task[] }>('/view-all', {
              params: { userId },
            });
            console.log(response.data.result)
            setUserTasks(response.data.result); // Set fetched tasks to the state
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        }
      };
  
      fetchTasks();
    }, [userId]); 


    useEffect(() => {
      const filterTasks = () => {
        const notCompleted = userTasks.filter((task) => task.completed === 0);
        setPendingTasks(notCompleted);
      };
  
      filterTasks();
    }, [userTasks]);
      
     


  

    return(
        <Box className="main-task-body">
             <Navbar /> 
             <Box sx={{ marginTop: '64px' }}> 
             <List sx={{ width: "95%", margin: "2%" }}>
        {pendingTasks.map((task) => {
          const labelId = `checkbox-list-label-${task.task_id}`; 
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          return (
            <ListItem
              key={task.task_id} 
              sx={{ bgcolor: randomColor, marginTop:"3px", borderRadius:'12px', }}
             
              disablePadding
            >
              <ListItemButton
                role={undefined}
               
                dense
              >
                <ListItemIcon>
                  <PendingActionsIcon
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.task_desc} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
                
            </Box>
        </Box>
    )
}