import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiverCaseSolution} from "../models/solution";

let initialState: { [scenarioId: number]: DiverCaseSolution } = {}

const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        putSolution(state, action: PayloadAction<DiverCaseSolution>) {
            const solution = action.payload;
            state[solution.scenarioId] = solution
        },
        deleteSolution(state, action: PayloadAction<number>) {
            delete state[action.payload];
        }
    }
});

export const solutionActions = solutionSlice.actions;
export const solutionsReducer = solutionSlice.reducer;