import {DiverCase} from "../models/diver-case";
import {DiverCaseSolutions} from "../models/solution";

const url = 'http://localhost:8080/'

const getSolutions = async (diverCase: DiverCase,
                            callbackSuccess: (solutions: DiverCaseSolutions) => void,
                            callbackError: (error: any) => void) => {

    const body = serializeDiverCase(diverCase)

    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
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


export const serializeDiverCase = (diverCase: DiverCase) => {

    const camelToSnakeCase = (text: string) => text.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);

    const jsonString = JSON.stringify(diverCase)
    return camelToSnakeCase(jsonString)
}


export default getSolutions;