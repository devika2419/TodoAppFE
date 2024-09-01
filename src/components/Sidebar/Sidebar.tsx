import { Box,  List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation} from "react-router-dom";

import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';



export default function DrawerList() {
    const colors = ['#c7d7fb', '#f1b0da', '#fec4b6']; // Different colors for each item

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const user_id = params.get('userId') || ' '

    const taskLinks = [`/task-manager?userId=${user_id}`, `/completed-tasks?userId=${user_id}`, `/pending-tasks?userId=${user_id}`]


  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Tasks', 'Completed', 'Pending'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{
              marginTop:'10%',  
              marginLeft:'2%',          
              backgroundColor: colors[index],
              borderRadius:'12px',
              width:"95%"
            
          }}>
            <ListItemButton component={Link} to={taskLinks[index]}>
            
            <ListItemIcon>
                {index % 2 === 0 ? <AssignmentIcon /> : <TaskAltIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />              
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
