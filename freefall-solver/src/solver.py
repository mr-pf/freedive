import numpy as np
from scipy.integrate import odeint

import equations
from diver_case import Diver, PlotRange, PlotParameters, Scenario, DiverCase
from solution import FreefallEquationsSolution, StaticForcesSolution, \
    TerminalVelocitySolution, ScenarioSolution


def solve_scenarios(diver_case: DiverCase) -> list[ScenarioSolution]:
    diver, scenarios, plot_parameters = diver_case.diver, diver_case.scenarios, diver_case.plot_parameters
    return [ScenarioSolution(
        scenario_id=s.id,
        static_forces=solve_static_forces(diver, s, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, s, plot_parameters),
        freefall_equations=solve_freefall_equation(diver, s, plot_parameters)
    ) for s in scenarios]


def solve_static_forces(diver: Diver, scenario: Scenario, plot_parameters: PlotParameters) -> StaticForcesSolution:
    depth = get_linspace(plot_parameters.depth_range)
    mass = diver.weight + scenario.extra_weight

    return StaticForcesSolution(
        depth=list(depth),
        static_forces_total=list(
            equations.static_forces_total(depth, mass, diver.volume_static, diver.volume_compressible))
    )


def solve_terminal_velocity(diver: Diver, scenario: Scenario,
                            plot_parameters: PlotParameters) -> TerminalVelocitySolution:
    depth = get_linspace(plot_parameters.depth_range)
    mass = diver.weight + scenario.extra_weight

    return TerminalVelocitySolution(
        depth=list(depth),
        variable=list(
            equations.terminal_velocity(depth, mass, diver.drag_coefficient, diver.drag_area, diver.volume_static,
                                        diver.volume_compressible)),
        final=equations.terminal_velocity_final(mass, diver.drag_coefficient, diver.drag_area, diver.volume_static)
    )


def solve_freefall_equation(diver: Diver, scenario: Scenario,
                            plot_parameters: PlotParameters) -> FreefallEquationsSolution:
    mass = diver.weight + scenario.extra_weight

    ode_system = equations.get_ode_system(mass=mass, volume_static=diver.volume_static,
                                          volume_compressible=diver.volume_compressible,
                                          drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)
    time = get_linspace(plot_parameters.time_range)

    initial_conditions = [scenario.start_depth, scenario.start_velocity]
    result = odeint(ode_system, y0=initial_conditions, t=time, tfirst=True)

    return FreefallEquationsSolution(
        time=list(time),
        depth=list(result.T[0]),
        velocity=list(result.T[1])
    )


def get_linspace(plot_range: PlotRange):
    return np.linspace(plot_range.min, plot_range.max, plot_range.num_points)
