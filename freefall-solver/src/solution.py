from dataclasses import dataclass


@dataclass
class FreefallEquationsSolution:
    time: list[float]
    depth: list[float]
    velocity: list[float]


@dataclass
class StaticForcesSolution:
    depth: list[float]
    static_forces_total: list[float]


@dataclass
class TerminalVelocitySolution:
    depth: list[float]
    variable: list[float]
    final: float


@dataclass
class ScenarioSolution:
    scenario_id: int
    static_forces: StaticForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equations: FreefallEquationsSolution
