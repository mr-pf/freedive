import Background from "../layout/Background";
import {Container, Stack} from "@mui/material";
import Scenarios from "../scenario/Scenarios";
import React from "react";
import DiverAttributes from "../diver/DiverAttributes";
import NavBar from "../layout/NavBar";


const CalculatorPage = () => {

    return (
        <Background>
            <NavBar/>
            <Container maxWidth="sm">
                <Stack spacing={2}>
                    {/*<DiverAttributes/>*/}
                    {/*<Scenarios/>*/}
                </Stack>
            </Container>
        </Background>
    );
}

export default CalculatorPage;