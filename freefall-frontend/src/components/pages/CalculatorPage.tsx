import Background from "../layout/Background";
import {Container, Stack} from "@mui/material";
import React from "react";
import NavBar from "../layout/NavBar";
import StaticForcesPlot from "../plots/StaticForcesPlot";


const CalculatorPage = () => {

    return (
        <Background>
            <NavBar/>
            <Container maxWidth="sm">
                <Stack spacing={2}>
                    {/*<DiverAttributes/>*/}
                    {/*<Scenarios/>*/}
                    <StaticForcesPlot/>
                </Stack>
            </Container>
        </Background>
    );
}

export default CalculatorPage;