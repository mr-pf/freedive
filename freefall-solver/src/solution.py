from dataclasses import dataclass


@dataclass
class FreefallEquationsSolutions:
    time: list[float]
    depth: dict[str: list[float]]
    velocity: dict[str: list[float]]


@dataclass
class StaticForcesSolutions:
    depth: list[float]
    static_forces_total: dict[str: list[float]]


@dataclass
class TerminalVelocitySolutions:
    depth: list[float]
    variable: dict[str: list[float]]
    final: dict[str, float]


@dataclass
class DiverCaseSolutions:
    static_forces: StaticForcesSolutions
    terminal_velocity: TerminalVelocitySolutions
    freefall_equations: FreefallEquationsSolutions
