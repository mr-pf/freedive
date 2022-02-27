export type FreefallEquationSolutions = {
    scenario_ids: string[]
    time: number[]
    depth: number[][]
    velocity: number[][]
}

export type StaticForcesSolutions = {
    weights: number[]
    depth: number[]
    static_forces_total: number[][]
}

export type TerminalVelocitySolutions = {
    weights: number[]
    depth: number[]
    variable: (number | null)[][]
    final: number[]
}

export type DiverCaseSolutions = {
    static_forces: StaticForcesSolutions
    terminal_velocity: TerminalVelocitySolutions
    freefall_equations: FreefallEquationSolutions
}
