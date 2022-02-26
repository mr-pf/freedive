import React, {useEffect} from 'react';
import './App.css';
import CalculatorPage from "./components/pages/CalculatorPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HOME_ROUTE, UNKNOWN_ROUTE} from "./constants/routes";
import {useAppSelector} from "./store/store";
import {useDispatch} from "react-redux";
import {getSolutionsAction} from "./store/actions";
import {createTheme, ThemeProvider} from "@mui/material";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const diverCase = useAppSelector(state => state.diverCase)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSolutionsAction(diverCase))
    }, [diverCase])


    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path={HOME_ROUTE} element={<CalculatorPage/>}/>
                    <Route path={UNKNOWN_ROUTE} element={<Navigate to={HOME_ROUTE}/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
