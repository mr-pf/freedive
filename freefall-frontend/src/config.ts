
const environmentIsLocal = () => {
    return process.env["REACT_APP_ENVIRONMENT"] === 'local'
}

export const getSolverUrl = () => {

    if (environmentIsLocal()) {
        return 'http://localhost:8080/'
    } else {
        return 'https://europe-west1-freediving-83da5.cloudfunctions.net/freefall_solver'
    }
}