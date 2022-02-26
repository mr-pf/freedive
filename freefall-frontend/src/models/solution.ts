export type FreefallEquationSolutions = {
    time: number[]
    depth:  {[scenarioId: string]: number[]}
    velocity:  {[scenarioId: string]: number[]}
}


export type StaticForcesSolutions = {
    depth: number[]
    static_forces_total: {[scenarioId: string]: number[]}
}


export type TerminalVelocitySolutions = {
    depth: number[]
    variable: {[scenarioId: string]: (number | null)[]}
    final: {[scenarioId: string]: number}
}


export type DiverCaseSolutions = {
    static_forces: StaticForcesSolutions
    terminal_velocity: TerminalVelocitySolutions
    freefall_equations: FreefallEquationSolutions
}