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
    variable: (number | null)[]
    final: number
}


export type DiverCaseSolution = {
    scenarioId: number
    static_forces: StaticForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equations: FreefallEquationSolution
}