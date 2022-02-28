from dataclasses import dataclass

from diver_case import DiverCase


@dataclass
class FreefallEquationsSolutions:
    scenario_ids: list[str]
    time: list[float]
    depth: list[list[float]]
    velocity: list[list[float]]


@dataclass
class StaticForcesSolutions:
    weights: list[float]
    depth: list[float]
    static_forces_total: list[list[float]]


@dataclass
class TerminalVelocitySolutions:
    weights: list[float]
    depth: list[float]
    variable: list[list[float]]
    final: list[float]


@dataclass
class DiverCaseSolutions:
    diver_case: DiverCase
    static_forces: StaticForcesSolutions
    terminal_velocity: TerminalVelocitySolutions
    freefall_equations: FreefallEquationsSolutions
