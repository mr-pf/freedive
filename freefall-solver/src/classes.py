from collections import namedtuple
from dataclasses import dataclass


@dataclass
class Diver:
    mass: float
    volume_static: float
    volume_compressible: float
    drag_area: float
    drag_coefficient: float


PlotRange = namedtuple('PlotRange', 'min max num_points')


@dataclass
class PlotParameters:
    time_range: PlotRange
    depth_range: PlotRange
    velocity_range: PlotRange


@dataclass
class Scenario:
    name: str
    start_depth: float
    start_velocity: float


class Solution:
    pass


@dataclass
class FreefallEquationSolution(Solution):
    scenario: Scenario
    time: list[float]
    depth: list[float]
    velocity: list[float]


@dataclass
class StaticForcesSolution(Solution):
    depth: list[float]
    gravitational_force: list[float]
    buoyant_force_constant: list[float]
    buoyant_force_variable: list[float]
    buoyant_force_total: list[float]
    static_forces_total: list[float]


@dataclass
class DynamicForcesSolution(Solution):
    velocity: list[float]
    drag_force: list[float]


@dataclass
class TerminalVelocitySolution(Solution):
    depth: list[float]
    variable: list[float]
    final: float


@dataclass
class DiverCaseSolution(Solution):
    diver: Diver
    static_forces: StaticForcesSolution
    dynamic_forces: DynamicForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equation_solutions: list[FreefallEquationSolution]
