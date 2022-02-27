import {Scenario} from "../../models/diver-case";

export const getScenarioName = (scenario: Scenario) => {
    return `sd:${scenario.startDepth} sv:${scenario.startVelocity} ew:${scenario.extraWeight}`
}

export const reshapeData = (x: number[], y: (number | null)[][], labels: string[]) => {
    return x.map((d, i) => {
        let scenarioValues = Object.assign({}, ...labels.map((label, j) => ({[label]: y[j][i]})));
        return {
            depth: d,
            ...scenarioValues
        }
    })
}

export const colorPalette1: string[] = [
    "#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]

export const colorPalette2: string[] = [
    "#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]

