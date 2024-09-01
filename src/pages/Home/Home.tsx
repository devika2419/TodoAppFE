import { Box, Button } from "@mui/material"
import "./Home.css"
import Logo from "../../assets/Logo.png"
import { useState, useEffect } from "react";
import Buttons from "../../components/Buttons/Buttons";
export default function Home(){

    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContainer(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }, []);

    
    return(
        <>
        <Box className="main-home-body">
            <Box className="logo-body">
                <img src={Logo} alt="Logo-img" />
            </Box>

            {showContainer && (

                <Buttons />

)}

        </Box>
    </>
       
    )
}