import {createSlice} from "@reduxjs/toolkit";


const parameterSlice = createSlice({
    name: 'parameters',
    initialState: {
        divers: [],
        scenarios: [],
        plotRanges: {
            depth: [0, 100, 100],
            velocity: [0, 2, 100],
            time: [0, 120, 100]
        }
    },
    reducers: {
        setPlotRanges(state, action) {
            state.plotRanges = action.payload;
        }
    }
});

export const parameterActions = parameterSlice.actions;
export const parameterReducer = parameterSlice.reducer;