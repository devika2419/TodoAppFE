import { Box, Button } from "@mui/material"
import "./Buttons.css"
import { useNavigate } from "react-router-dom"

export default function Buttons(){
    const navigate =  useNavigate()
    return(
        <Box className="button-container">
                <Box className="buttons">
                <Button className="button1" variant="contained"  onClick={()=> navigate("/login")}
                >Let's get started!</Button>
                </Box>
                
            </Box>
    )
}