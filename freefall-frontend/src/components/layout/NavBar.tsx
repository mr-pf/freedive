import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {Container, Link} from "@mui/material";
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
            <Container maxWidth="lg">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography
                        variant="h5"
                        sx={{mr: 10}}
                        color="text.primary"
                    >
                        Freefall Physics Calculator
                    </Typography>

                    <Link
                        href="https://github.com/mr-pf/freedive/blob/master/instructor-thesis/freefall.ipynb"
                        target="_blank">
                        Theory on Github
                    </Link>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;