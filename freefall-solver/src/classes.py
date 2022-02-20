from dataclasses import dataclass

import numpy as np


@dataclass
class Diver:
    mass: float
    volume_static: float
    volume_compressible: float
    drag_area: float
    drag_coefficient: float


@dataclass
class PlotParameters:
    time_range: np.ndarray
    depth_range: np.ndarray
    velocity_range: np.ndarray


@dataclass
class Scenario:
    name: str
    start_depth: float
    start_velocity: float


@dataclass
class FreefallEquationSolution:
    scenario: Scenario
    time: np.ndarray
    depth: np.ndarray
    velocity: np.ndarray


@dataclass
class StaticForcesSolution:
    depth: np.ndarray
    gravitational_force: np.ndarray
    buoyant_force_constant: np.ndarray
    buoyant_force_variable: np.ndarray
    buoyant_force_total: np.ndarray
    static_forces_total: np.ndarray


@dataclass
class DynamicForcesSolution:
    velocity: np.ndarray
    drag_force: np.ndarray


@dataclass
class TerminalVelocitySolution:
    depth: np.ndarray
    variable: np.ndarray
    final: float


@dataclass
class DiverCaseSolution:
    diver: Diver
    static_forces: StaticForcesSolution
    dynamic_forces: DynamicForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equation_solutions: list[FreefallEquationSolution]