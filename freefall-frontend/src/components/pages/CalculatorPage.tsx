import {Box, Container, Stack} from "@mui/material";
import React from "react";
import NavBar from "../layout/NavBar";
import StaticForcesPlot from "../plots/StaticForcesPlot";
import TerminalVelocityPlot from "../plots/TerminalVelocityPlot";
import DiverAttributes from "../diver/DiverAttributes";
import Scenarios from "../scenario/Scenarios";
import FreefallEquationsDepthPLot from "../plots/FreefallEquationsDepthPlot";
import FreefallEquationsVelocityPLot from "../plots/FreefallEquationsVelocityPlot";
import Background from "../layout/Background";


const CalculatorPage = () => {

    return (
        <Background>
            <NavBar/>
            <Container maxWidth="md" sx={{opacity: 0.8}}>
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
        </Background>
    );
}

export default CalculatorPage;