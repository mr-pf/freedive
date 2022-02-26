import {Scenario} from "../../models/diver-case";

export const getScenarioName = (scenario: Scenario) => {
    return `id:${scenario.id} sd:${scenario.startDepth} sv:${scenario.startVelocity} ew:${scenario.extraWeight}`
}

export const reshapeData = (x: number[], y: { [name: string]: (number | null)[] }) => {
    return x.map((d, i) => {
        let scenarioValues = Object.assign({}, ...Object.keys(y).map((id) => ({[id]: y[id][i]})));
        return {
            depth: d,
            ...scenarioValues
        }
    })
}

export const colorPalette: {[key: string]: string} = {
    "0": "#e60049",
    "1": "#0bb4ff",
    "2": "#50e991",
    "3": "#e6d800",
    "4": "#9b19f5",
    "5": "#ffa300",
    "6": "#dc0ab4",
    "7": "#b3d4ff",
    "8": "#00bfa0"
}