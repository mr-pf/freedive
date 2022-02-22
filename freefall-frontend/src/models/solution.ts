import {Diver, Scenario} from "./diver-case";


export type FreefallEquationSolution = {
    time: number[]
    depth: number[]
    velocity: number[]
}


export type StaticForcesSolution = {
    depth: number[]
    staticForcesTotal: number[]
}


export type TerminalVelocitySolution = {
    depth: number[]
    variable: number[]
    final: number
}


export type DiverCaseSolution = {
    scenarioId: number
    staticForces: StaticForcesSolution
    terminalVelocity: TerminalVelocitySolution
    freefallEquationSolutions: FreefallEquationSolution
}