import {DiverCase} from "../models/diver-case";
import {Dispatch} from "redux";
import {DiverCaseSolutions} from "../models/solution";
import getSolutions from "../services/freefall-solver-client";
import {solutionActions} from "./solution-slice";


export const getSolutionsAction = (diverCase: DiverCase) => {
    return (dispatch: Dispatch) => {

        const handleSuccess = (solutions: DiverCaseSolutions) => {
            console.log('Solutions successfully received')
            dispatch(solutionActions.putSolutions(solutions))
        }

        const handleError = (error: any) => {
            console.log(error)
        }

        console.log('Fetching solutions')
        getSolutions(diverCase, handleSuccess, handleError).then()
    }

}