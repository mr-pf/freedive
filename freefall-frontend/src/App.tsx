import React from 'react';
import './App.css';
import {Container, Stack} from "@mui/material";
import DiverAttributes from "./components/diver/DiverAttributes";
import Scenarios from "./components/scenario/Scenarios";
import Background from "./components/layout/Background";

function App() {
    return (
        <Background>
            <Container maxWidth="sm">
                <Stack spacing={2}>
                    {/*<DiverAttributes/>*/}
                    <Scenarios/>
                </Stack>
            </Container>
        </Background>

    );
}

export default App;
