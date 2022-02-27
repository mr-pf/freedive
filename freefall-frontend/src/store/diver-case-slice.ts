import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Diver, DiverCase, PlotParameters, Scenario} from "../models/diver-case";


const initialState: DiverCase = {
    diver: {
        weight: 66,
        volume_static: 0.062,
        volume_compressible: 0.006,
        drag_area: 0.07,
        drag_coefficient: 0.3
    },
    scenarios: [
        {id: "0", start_depth: 20, start_velocity: 1.4, extra_weight: 0},
        {id: "1", start_depth: 20, start_velocity: 0.8, extra_weight: 0},
        {id: "2", start_depth: 30, start_velocity: 1.4, extra_weight: 0},
        {id: "3", start_depth: 30, start_velocity: 0.8, extra_weight: 0},

    ],
    plot_parameters: {
        time_range: {min: 0, max: 120, num_points: 121},
        depth_range: {min: 0, max: 120, num_points: 121},
        velocity_range: {min: 0, max: 3, num_points: 121}
    }
};


const diverCaseSlice = createSlice({
    name: 'diverCase',
    initialState,
    reducers: {
        setDiver(state, action: PayloadAction<Diver>) {
            state.diver = action.payload;
        },
        putScenario(state, action: PayloadAction<Scenario>) {
            state.scenarios.push(action.payload);
        },
        deleteScenario(state, action: PayloadAction<Scenario>) {
            state.scenarios = state.scenarios.filter(s => s.id !== action.payload.id)
        },
        setPlotParameters(state, action: PayloadAction<PlotParameters>) {
            state.plot_parameters = action.payload;
        }
    }
});

export const diverCaseActions = diverCaseSlice.actions;
export const diverCaseReducer = diverCaseSlice.reducer;