import {Diver, Scenario} from "./diver-case";


export type FreefallEquationSolution = {
    time: number[]
    depth: number[]
    velocity: number[]
}


export type StaticForcesSolution = {
    depth: number[]
    static_forces_total: number[]
}


export type TerminalVelocitySolution = {
    depth: number[]
    variable: number[]
    final: number
}


export type DiverCaseSolution = {
    static_forces: StaticForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equation_solutions: FreefallEquationSolution
}