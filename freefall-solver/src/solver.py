import numpy as np
from scipy.integrate import odeint

import equations
from diver_case import Diver, PlotRange, PlotParameters, Scenario, DiverCase
from solution import FreefallEquationsSolutions, StaticForcesSolutions, \
    TerminalVelocitySolutions, DiverCaseSolutions


def solve_diver_case(diver_case: DiverCase) -> DiverCaseSolutions:
    diver, scenarios, plot_parameters = diver_case.diver, diver_case.scenarios, diver_case.plot_parameters
    return DiverCaseSolutions(
        static_forces=solve_static_forces(diver, scenarios, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, scenarios, plot_parameters),
        freefall_equations=solve_freefall_equation(diver, scenarios, plot_parameters)
    )


def solve_static_forces(diver: Diver, scenarios: list[Scenario],
                        plot_parameters: PlotParameters) -> StaticForcesSolutions:
    depth_array = get_linspace(plot_parameters.depth_range)
    force_arrays = {}

    for s in scenarios:
        mass = diver.weight + s.extra_weight
        force_arrays[s.id] = list(
            equations.static_forces_total(depth_array, mass, diver.volume_static, diver.volume_compressible))

    return StaticForcesSolutions(
        depth=list(depth_array),
        static_forces_total=force_arrays
    )


def solve_terminal_velocity(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> TerminalVelocitySolutions:
    depth_array = get_linspace(plot_parameters.depth_range)
    velocity_arrays = {}
    velocities_final = {}

    for s in scenarios:
        mass = diver.weight + s.extra_weight
        velocity_arrays[s.id] = list(
            equations.terminal_velocity(depth_array, mass, diver.drag_coefficient, diver.drag_area, diver.volume_static,
                                        diver.volume_compressible))
        velocities_final[s.id] = equations.terminal_velocity_final(mass, diver.drag_coefficient, diver.drag_area,
                                                                   diver.volume_static)

    return TerminalVelocitySolutions(
        depth=list(depth_array),
        variable=velocity_arrays,
        final=velocities_final
    )


def solve_freefall_equation(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> FreefallEquationsSolutions:
    time_array = get_linspace(plot_parameters.time_range)
    depth_arrays = {}
    velocity_arrays = {}

    for s in scenarios:
        mass = diver.weight + s.extra_weight
        initial_conditions = [s.start_depth, s.start_velocity]
        ode_system = equations.get_ode_system(mass=mass, volume_static=diver.volume_static,
                                              volume_compressible=diver.volume_compressible,
                                              drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)

        result = odeint(ode_system, y0=initial_conditions, t=time_array, tfirst=True)

        depth_arrays[s.id] = list(result.T[0])
        velocity_arrays[s.id] = list(result.T[1])

    return FreefallEquationsSolutions(
        time=list(time_array),
        depth=depth_arrays,
        velocity=velocity_arrays
    )


def get_linspace(plot_range: PlotRange):
    return np.linspace(plot_range.min, plot_range.max, plot_range.num_points)
