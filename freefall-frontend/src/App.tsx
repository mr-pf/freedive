import React, { Fragment } from 'react';
import './App.css';
import Background from "./components/layout/Background";
import {Container} from "@mui/material";
import Diver from "./components/diver/Diver";

function App() {
    return (
        <Fragment>
            {/*<Background/>*/}
            <Container maxWidth="md">
                <Diver/>
            </Container>;
        </Fragment>
    )
        ;
}

export default App;
