import React from 'react';
import './App.css';
import {Container, Grid} from "@mui/material";
import DiverAttributes from "./components/diver/DiverAttributes";
import Scenarios from "./components/scenario/Scenarios";
import Background from "./components/layout/Background";

function App() {
    return (
        <Background>
            <Container maxWidth="md">

                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <DiverAttributes/>
                    </Grid>
                    <Grid item xs={7}>
                        <Scenarios/>
                    </Grid>
                </Grid>
            </Container>
        </Background>

    );
}

export default App;
