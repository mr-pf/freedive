import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiverCaseSolutions} from "../models/solution";

let initialState: DiverCaseSolutions = {
    static_forces: {weights: [], depth: [], static_forces_total: []},
    terminal_velocity: {weights: [], depth: [], variable: [], final: []},
    freefall_equations: {scenario_ids: [], time: [], depth: [], velocity: []}
}

const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        putSolutions(state, action: PayloadAction<DiverCaseSolutions>) {
            return action.payload
        }
    }
});

export const solutionActions = solutionSlice.actions;
export const solutionsReducer = solutionSlice.reducer;