import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Diver, DiverCase, PlotParameters, PlotRange, Scenario} from "../models/diver-case";


const initialState = new DiverCase(
    new Diver(64, 0.062, 0.006, 0.07, 0.3),
    {
        0: new Scenario(0, 20, 1, 0),
        1: new Scenario(1, 20, 1.5, 0),
        2: new Scenario(2, 30, 1, 0),
        3: new Scenario(2, 30, 1.5, 0),
        4: new Scenario(0, 20, 1, 2),
        5: new Scenario(1, 20, 1.5, 2),
        6: new Scenario(2, 30, 1, 2),
        7: new Scenario(2, 30, 1.5, 2),
    },
    new PlotParameters(
        new PlotRange(0, 120, 100),
        new PlotRange(0, 100, 100),
        new PlotRange(0, 3, 100)
    )
);


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