import React from 'react';
import './App.css';
import {Container, Grid} from "@mui/material";
import Diver from "./components/diver/Diver";
import Scenarios from "./components/scenario/Scenarios";
import Background from "./components/layout/Background";

function App() {
    return (
        <Background>
            <Container maxWidth="md">

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Diver/>
                    </Grid>
                    <Grid item xs={8}>
                        <Scenarios/>
                    </Grid>
                </Grid>
            </Container>
        </Background>

    );
}

export default App;
