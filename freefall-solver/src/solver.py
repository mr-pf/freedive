import numpy as np
from scipy.integrate import odeint

import equations
from diver_case import Diver, PlotRange, PlotParameters, Scenario, DiverCase
from solution import FreefallEquationsSolutions, StaticForcesSolutions, \
    TerminalVelocitySolutions, DiverCaseSolutions


def solve_diver_case(diver_case: DiverCase) -> DiverCaseSolutions:
    diver, scenarios, plot_parameters = diver_case.diver, diver_case.scenarios, diver_case.plot_parameters
    return DiverCaseSolutions(
        diver_case=diver_case,
        static_forces=solve_static_forces(diver, scenarios, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, scenarios, plot_parameters),
        freefall_equations=solve_freefall_equation(diver, scenarios, plot_parameters)
    )


def solve_static_forces(diver: Diver, scenarios: list[Scenario],
                        plot_parameters: PlotParameters) -> StaticForcesSolutions:
    depth_array = get_linspace(plot_parameters.depth_range)
    total_weights = list(set([diver.weight + s.extra_weight for s in scenarios]))

    force_arrays = []
    for w in total_weights:
        force_array = list(
            equations.static_forces_total(depth_array, w, diver.volume_static, diver.volume_compressible))
        force_arrays.append(force_array)

    return StaticForcesSolutions(
        weights=total_weights,
        depth=list(depth_array),
        static_forces_total=force_arrays
    )


def solve_terminal_velocity(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> TerminalVelocitySolutions:
    depth_array = get_linspace(plot_parameters.depth_range)
    total_weights = list(set([diver.weight + s.extra_weight for s in scenarios]))

    velocity_arrays = []
    velocities_final = []
    for w in total_weights:
        velocity_array = list(equations.terminal_velocity(depth_array, w, diver.drag_coefficient, diver.drag_area,
                                                          diver.volume_static, diver.volume_compressible))
        velocity_arrays.append(velocity_array)

        velocity_final = equations.terminal_velocity_final(w, diver.drag_coefficient, diver.drag_area,
                                                           diver.volume_static)
        velocities_final.append(velocity_final)

    return TerminalVelocitySolutions(
        weights=total_weights,
        depth=list(depth_array),
        variable=velocity_arrays,
        final=velocities_final
    )


def solve_freefall_equation(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> FreefallEquationsSolutions:
    scenario_ids = []
    time_array = get_linspace(plot_parameters.time_range)
    depth_arrays = []
    velocity_arrays = []

    for s in scenarios:
        mass = diver.weight + s.extra_weight
        initial_conditions = [s.start_depth, s.start_velocity]
        ode_system = equations.get_ode_system(mass=mass, volume_static=diver.volume_static,
                                              volume_compressible=diver.volume_compressible,
                                              drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)
        result = odeint(ode_system, y0=initial_conditions, t=time_array, tfirst=True)
        depth_array = result.T[0]
        velocity_array = result.T[1]

        depth_array = np.insert(depth_array, 0, 0)
        velocity_array = np.insert(velocity_array, 0, s.start_velocity)

        scenario_ids.append(s.id)
        depth_arrays.append(list(depth_array))
        velocity_arrays.append(list(velocity_array))

    time_array = np.insert(time_array, 0, 0)

    return FreefallEquationsSolutions(
        scenario_ids=scenario_ids,
        time=list(time_array),
        depth=depth_arrays,
        velocity=velocity_arrays
    )


def get_linspace(plot_range: PlotRange):
    return np.linspace(plot_range.min, plot_range.max, plot_range.num_points)
