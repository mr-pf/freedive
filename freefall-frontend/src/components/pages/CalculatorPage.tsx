import {Box, Container, Grid, Stack} from "@mui/material";
import React from "react";
import NavBar from "../layout/NavBar";
import StaticForcesPlot from "../plots/StaticForcesPlot";
import TerminalVelocityPlot from "../plots/TerminalVelocityPlot";
import DiverAttributes from "../diver/DiverAttributes";
import Scenarios from "../scenario/Scenarios";
import FreefallEquationsDepthPlot from "../plots/FreefallEquationsDepthPlot";
import FreefallEquationsVelocityPLot from "../plots/FreefallEquationsVelocityPlot";
import Background from "../layout/Background";


const CalculatorPage = () => {

    return (
        <Background>
            <NavBar/>
            <Container maxWidth="lg" sx={{opacity: 0.8}}>
                <Box m={2}>
                    <Grid container spacing={4}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Stack spacing={2}>
                                <DiverAttributes/>
                                <StaticForcesPlot/>
                                <TerminalVelocityPlot/>
                            </Stack>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Stack spacing={2}>
                                <Scenarios/>
                                <FreefallEquationsDepthPlot/>
                                <FreefallEquationsVelocityPLot/>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Background>
    )
        ;
}

export default CalculatorPage;