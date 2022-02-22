import {configureStore} from "@reduxjs/toolkit";
import {diverCaseReducer} from "./diver-case";
import {solutionReducer} from "./solution";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        parameter: diverCaseReducer,
        solution: solutionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector