import {configureStore} from "@reduxjs/toolkit";
import {diverCaseReducer} from "./diver-case-slice";
import {solutionsReducer} from "./solution-slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
         diverCase: diverCaseReducer,
         solutions: solutionsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;