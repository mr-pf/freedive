import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Diver, DiverCase, PlotParameters, Scenario} from "../models/diver-case";


const initialState: DiverCase = {
    diver: {
        weight: 64,
        volumeStatic: 0.062,
        volumeCompressible: 0.006,
        dragArea: 0.07,
        dragCoefficient: 0.3
    },
    scenarios: [
        {id: "0", startDepth: 20, startVelocity: 1, extraWeight: 0},
        {id: "1", startDepth: 20, startVelocity: 1.5, extraWeight: 0},
        {id: "2", startDepth: 30, startVelocity: 1, extraWeight: 0},
        {id: "3", startDepth: 30, startVelocity: 1.5, extraWeight: 0},
        {id: "4", startDepth: 20, startVelocity: 1, extraWeight: 2},
        {id: "5", startDepth: 20, startVelocity: 1.5, extraWeight: 2},
        {id: "6", startDepth: 30, startVelocity: 1, extraWeight: 2},
        {id: "7", startDepth: 30, startVelocity: 1.5, extraWeight: 2},
    ],
    plotParameters: {
        timeRange: {min: 0, max: 120, numPoints: 121},
        depthRange: {min: 0, max: 120, numPoints: 121},
        velocityRange: {min: 0, max: 3, numPoints: 121}
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
            console.log(action.payload)
            state.scenarios = state.scenarios.filter(s => s.id !== action.payload.id)
        },
        setPlotParameters(state, action: PayloadAction<PlotParameters>) {
            state.plotParameters = action.payload;
        }
    }
});

export const diverCaseActions = diverCaseSlice.actions;
export const diverCaseReducer = diverCaseSlice.reducer;