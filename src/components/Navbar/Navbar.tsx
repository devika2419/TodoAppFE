import { Box, Button, Drawer, Typography,  Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import DrawerList from "../Sidebar/Sidebar";
import "./Navbar.css";
import { useState } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import api from "../../pages/api/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [tasks, setTask] = useState<string>(""); 

  const navigate = useNavigate();

  

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const toggleDialog = (newOpen: boolean) => {
    setDialogOpen(newOpen);
  };

   //Get userId to pass as params

   const location = useLocation();
   const getUserIdFromQuery=()=>{
     const params = new URLSearchParams(location.search);

     return params.get('userId') || '';
   
   }

  const handleSubmit = async (tasks:string)=>{
    try {

      const userId = getUserIdFromQuery();

      const response = await api.post("/add-tasks", {
        userId, 
        tasks  
        
      });
      console.log(response.data);

      navigate(0);
      

      // window.location.reload();




    } catch (error) {
      console.error("Error submitting tasks:", error);
   
    }

  }

  return (
    <Box className="navbar-body">
      <Button onClick={() => toggleDrawer(true)}>
        <FormatListBulletedIcon sx={{ color: "white" }} />
      </Button>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerList />
      </Drawer>

      <Box className="button-navbar-container">
        <Box className="add-task">
        <Button className="add-button" onClick={() => toggleDialog(true)}>
        <PlaylistAddIcon sx={{color:"white"}} />
          </Button>
        </Box>

        <Box className="sign-out">
          <Typography variant="body1" >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Sign Out
            </Link>
          </Typography>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => toggleDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
            value={tasks}
            onChange={(e) => setTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
          <Button onClick={()=>handleSubmit(tasks)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}