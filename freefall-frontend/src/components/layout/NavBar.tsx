import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {Button, Container} from "@mui/material";
import {CALCULATOR_ROUTE, THEORY_ROUTE} from "../../constants/routes";


const NavBar = () => {

    let navigate = useNavigate();

    const handleGoToCalculator = () => {
        navigate(CALCULATOR_ROUTE);
    }

    const handleGoToTheory = () => {
        navigate(THEORY_ROUTE);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        Freefall physics
                    </Typography>

                    <Button variant="text" onClick={handleGoToCalculator} color="secondary">Calculator</Button>
                    <Button variant="text" onClick={handleGoToTheory} color="secondary">Theory</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;