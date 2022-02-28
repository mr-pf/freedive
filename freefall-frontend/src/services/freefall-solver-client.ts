import {DiverCase} from "../models/diver-case";
import {DiverCaseSolutions} from "../models/solution";
import {getSolverUrl} from "../config";


const getSolutions = async (diverCase: DiverCase,
                            callbackSuccess: (solutions: DiverCaseSolutions) => void,
                            callbackError: (error: any) => void) => {

    const url = getSolverUrl()
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(diverCase),
        })
        .then(response => {
            return response.json()
        })
        .then<DiverCaseSolutions>(json => {
            return json
        })
        .then(solutions => {
            callbackSuccess(solutions)
        })
        .catch(error => {
            callbackError(error)
        })
}


export default getSolutions;