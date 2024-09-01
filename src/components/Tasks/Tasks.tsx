import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import "./Tasks.css";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../pages/api/api";
import { useLocation, useNavigate } from "react-router-dom";

interface Task {
  task_id: number;
  user_id: string;
  task_desc: string;
  completed: number; // 1 for completed, 0 for not completed
  created_at?: string;
}

export default function Tasks() {
  const colors = ['#c7d7fb', '#f1b0da', '#fec4b6', '#ddedea', '#fcf4dd'];

  const [checked, setChecked] = useState<number[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userId
  const getUserIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('userId') || '';
  }

  const userId = getUserIdFromQuery();

  // Retrieve tasks
  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          // Fetch tasks filtered by userId from the backend
          const response = await api.get<{ result: Task[] }>('/view-all', {
            params: { userId },
          });
          const tasks = response.data.result;
          setUserTasks(tasks);
          setChecked(tasks.filter(task => task.completed === 1).map(task => task.task_id));
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchTasks();
  }, [userId]);

  const handleToggle = (value: number) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);  
    } else {
      newChecked.splice(currentIndex, 1);  
    }

    setChecked(newChecked);

    const userId = getUserIdFromQuery();

    if (userId) {
      try {
        await api.put('/completed', {
          userId,
          task_id: value,
          completed: newChecked.includes(value)
        });
      } catch (error) {
        console.error('Error updating task completion:', error);
      }
    }
  };

  const handleDelete = async (task_id: number) => {
    const userId = getUserIdFromQuery();
    try {
      if (task_id) {
        await api.delete("/delete", {
          data: {
            userId,
            task_id,
          },
        });

        navigate(0); // Refresh page
      } else {
        console.log("couldn't delete task!");
      }
    } catch (error) {
      console.log("Error deleting task:", (error as Error).message);
    }
  }

  return (
    <Box className="main-task-body">
      <List sx={{ width: "95%", margin: "2%" }}>
        {userTasks.map((task) => {
          const labelId = `checkbox-list-label-${task.task_id}`; 
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          return (
            <ListItem
              key={task.task_id} 
              sx={{ bgcolor: randomColor, marginTop: "3px", borderRadius: '12px' }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.task_id)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(task.task_id)} 
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(task.task_id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.task_desc} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
