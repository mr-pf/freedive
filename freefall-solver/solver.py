from dataclasses import dataclass

import numpy as np
from scipy.intetgrations import odeint

import equations


@dataclass
class Diver:
    mass: float
    volume_static: float
    volume_compressible: float
    drag_area: float
    drag_coefficient: float


@dataclass
class PlotParameters:
    time_range: np.array
    depth_range: np.aray
    velocity_range: np.array


@dataclass
class Scenario:
    name: str
    start_depth: float
    start_velocity: float


@dataclass
class FreefallEquationSolution:
    scenario: Scenario
    time: np.array
    depth: np.array
    velocity: np.array


@dataclass
class StaticForcesSolution:
    depth: np.array
    gravitational_force: np.array
    buoyant_force_constant: np.array
    buoyant_force_variable: np.array
    buoyant_force_total: np.array
    static_forces_total: np.array


@dataclass
class DynamicForcesSolution:
    velocity: np.array
    drag_force: np.array


@dataclass
class TerminalVelocitySolution:
    depth: np.array
    variable: np.array
    final: float


@dataclass
class DiverCaseSolution:
    diver: Diver
    static_forces: StaticForcesSolution
    dynamic_forces: DynamicForcesSolution
    terminal_velocity: TerminalVelocitySolution
    freefall_equation_solutions: list[FreefallEquationSolution]


def solve_diver_case(diver: Diver, scenarios: list[Scenario], plot_parameters: PlotParameters):
    return DiverCaseSolution(
        diver=diver,
        static_forces=solve_static_forces(diver, plot_parameters),
        dynamic_forces=solve_dynamic_forces(diver, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, plot_parameters),
        freefall_equation_solutions=[solve_freefall_equation(diver, s) for s in scenarios]
    )


def solve_static_forces(diver: Diver, plot_parameters: PlotParameters) -> StaticForcesSolution:
    return StaticForcesSolution(
        depth=plot_parameters.depth_range,
        gravitational_force=equations.gravitational_force(plot_parameters.depth_range, diver.mass),
        buoyant_force_constant=equations.buoyant_force_constant(plot_parameters.depth_range, diver.volume_static),
        buoyant_force_variable=equations.buoyant_force_variable(plot_parameters.depth_range, diver.volume_compressible),
        buoyant_force_total=equations.buoyant_force_total(plot_parameters.depth_range, diver.volume_static,
                                                          diver.volume_compressible),
        static_forces_total=equations.static_forces_total(plot_parameters.depth_range, diver.mass, diver.volume_static,
                                                          diver.volume_compressible)
    )


def solve_dynamic_forces(diver: Diver, plot_parameters: PlotParameters) -> DynamicForcesSolution:
    return DynamicForcesSolution(
        velocity=plot_parameters.velocity_range,
        drag_force=equations.drag_force(plot_parameters.velocity_range, diver.drag_coefficient, diver.drag_area)
    )


def solve_terminal_velocity(diver: Diver, plot_parameters: PlotParameters) -> TerminalVelocitySolution:
    return TerminalVelocitySolution(
        depth=plot_parameters.depth_range,
        variable=equations.terminal_velocity(plot_parameters.depth_range, diver.mass, diver.drag_coefficient,
                                             diver.drag_area, diver.volume_static, diver.volume_compressible),
        final=equations.terminal_velocity_final(diver.mass, diver.drag_coefficient,
                                                diver.drag_area, diver.volume_static)
    )


def solve_freefall_equation(diver: Diver, scenario: Scenario, plot_parameters: PlotParameters) -> FreefallEquationSolution:
    ode_system = equations.get_ode_system(mass=diver.mass, volume_static=diver.volume_static,
                                          volume_compressible=diver.volume_compressible,
                                          drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)

    initial_conditions = [scenario.start_depth, scenario.start_velocity]
    result = odeint(ode_system, y0=initial_conditions, t=plot_parameters.time_range, tfirst=True)

    return FreefallEquationSolution(
        scenario=scenario,
        time=plot_parameters.time_range,
        depth=result.T[0],
        velocity=result.T[1]
    )
