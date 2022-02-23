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
    scenarios: {
        0: {id: 0, startDepth: 20, startVelocity: 1, extraWeight: 0},
        1: {id: 1, startDepth: 20, startVelocity: 1.5, extraWeight: 0},
        2: {id: 2, startDepth: 30, startVelocity: 1, extraWeight: 0},
        3: {id: 3, startDepth: 30, startVelocity: 1.5, extraWeight: 0},
        4: {id: 4, startDepth: 20, startVelocity: 1, extraWeight: 2},
        5: {id: 5, startDepth: 20, startVelocity: 1.5, extraWeight: 2},
        6: {id: 6, startDepth: 30, startVelocity: 1, extraWeight: 2},
        7: {id: 7, startDepth: 30, startVelocity: 1.5, extraWeight: 2},
    },
    plotParameters: {
        timeRange: {min: 0, max: 120, numPoints: 100},
        depthRange: {min: 0, max: 100, numPoints: 100},
        velocityRange: {min: 0, max: 3, numPoints: 100}
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
            const scenario = action.payload;
            state.scenarios[scenario.id] = scenario;
        },
        deleteScenario(state, action: PayloadAction<number>) {
            delete state.scenarios[action.payload];
        },
        setPlotParameters(state, action: PayloadAction<PlotParameters>) {
            state.plotParameters = action.payload;
        }
    }
});

export const diverCaseActions = diverCaseSlice.actions;
export const diverCaseReducer = diverCaseSlice.reducer;