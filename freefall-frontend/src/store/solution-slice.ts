import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiverCaseSolutions} from "../models/solution";

let initialState: DiverCaseSolutions = {
    static_forces: {depth: [], static_forces_total: {}},
    terminal_velocity: {depth: [], variable: {}, final: {}},
    freefall_equations: {time: [], depth: {}, velocity: {}}
}

const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        putSolutions(state, action: PayloadAction<DiverCaseSolutions>) {
            state = action.payload
        }
    }
});

export const solutionActions = solutionSlice.actions;
export const solutionsReducer = solutionSlice.reducer;