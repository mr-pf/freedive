import {Diver, Scenario} from "./parameters";


export type FreefallEquationSolution = {
    scenario: Scenario
    time: number[]
    depth: number[]
    velocity: number[]
}


export type StaticForcesSolution = {
    depth: number[]
    gravitational_force: number[]
    buoyant_force_constant: number[]
    buoyant_force_variable: number[]
    buoyant_force_total: number[]
    static_forces_total: number[]
}


export type DynamicForcesSolution = {
    velocity: number[]
    drag_force: number[]
}


export type TerminalVelocitySolution = {
    depth: number[]
    variable: number[]
    final: number
}


export type DiverCaseSolution = {
    diver: Diver
    static_forces: StaticForcesSolution
    dynamic_forces: DynamicForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equation_solutions: FreefallEquationSolution[]
}