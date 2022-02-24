import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiverCaseSolution} from "../models/solution";

let initialState:  DiverCaseSolution[] = []

const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        putSolutions(state, action: PayloadAction<DiverCaseSolution[]>) {
            state = action.payload
        }
    }
});

export const solutionActions = solutionSlice.actions;
export const solutionsReducer = solutionSlice.reducer;