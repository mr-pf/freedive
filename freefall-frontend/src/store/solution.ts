import {createSlice} from "@reduxjs/toolkit";


const solutionSlice = createSlice({
    name: 'solution',
    initialState: {
        solutions: [],
    },
    reducers: {}

});

export const solutionActions = solutionSlice.actions;
export const solutionReducer = solutionSlice.reducer;