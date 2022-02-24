import {Box, Container, Stack} from "@mui/material";
import React, {Fragment} from "react";
import NavBar from "../layout/NavBar";
import StaticForcesPlot from "../plots/StaticForcesPlot";
import TerminalVelocityPlot from "../plots/TerminalVelocityPlot";
import DiverAttributes from "../diver/DiverAttributes";
import Scenarios from "../scenario/Scenarios";
import FreefallEquationsDepthPLot from "../plots/FreefallEquationsDepthPlot";
import FreefallEquationsVelocityPLot from "../plots/FreefallEquationsVelocityPlot";


const CalculatorPage = () => {

    return (
        <Fragment>
            <NavBar/>
            <Container maxWidth="sm">
                <Box m={2}>
                <Stack spacing={2}>
                    <DiverAttributes/>
                    <Scenarios/>
                    <StaticForcesPlot/>
                    <TerminalVelocityPlot/>
                    <FreefallEquationsDepthPLot/>
                    <FreefallEquationsVelocityPLot/>
                </Stack>
                </Box>
            </Container>
        </Fragment>
    );
}

export default CalculatorPage;