import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiverCaseSolutions} from "../models/solution";

let initialState: DiverCaseSolutions = {
    diver_case: {
        diver: {weight: 0, volume_static: 0, volume_compressible: 0, drag_area: 0, drag_coefficient: 0},
        scenarios: [],
        plot_parameters: {
            time_range: {min: 0, max: 0},
            depth_range: {min: 0, max: 0},
            velocity_range: {min: 0, max: 0}}
    },
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