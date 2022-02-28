import numpy as np
from scipy.integrate import odeint

import equations
from diver_case import Diver, PlotParameters, Scenario, DiverCase
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
    depth_array = np.arange(plot_parameters.depth_range.min, plot_parameters.depth_range.max + 1)
    total_weights = list(set([diver.weight + s.extra_weight for s in scenarios]))

    force_arrays = []
    for w in total_weights:
        force_array = np.round(
            equations.static_forces_total(depth_array, w, diver.volume_static, diver.volume_compressible), 2)
        force_arrays.append(force_array.tolist())

    return StaticForcesSolutions(
        weights=total_weights,
        depth=depth_array.tolist(),
        static_forces_total=force_arrays
    )


def solve_terminal_velocity(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> TerminalVelocitySolutions:
    depth_array = np.asarray(range(plot_parameters.depth_range.min, plot_parameters.depth_range.max + 1))
    total_weights = list(set([diver.weight + s.extra_weight for s in scenarios]))

    velocity_arrays = []
    velocities_final = []
    for w in total_weights:
        velocity_array = np.round(equations.terminal_velocity(depth_array, w, diver.drag_coefficient, diver.drag_area,
                                                              diver.volume_static, diver.volume_compressible), 2)
        velocity_arrays.append(velocity_array.tolist())

        velocity_final = round(equations.terminal_velocity_final(w, diver.drag_coefficient, diver.drag_area,
                                                                 diver.volume_static), 2)
        velocities_final.append(velocity_final)

    return TerminalVelocitySolutions(
        weights=total_weights,
        depth=depth_array.tolist(),
        variable=velocity_arrays,
        final=velocities_final
    )


def solve_freefall_equation(diver: Diver, scenarios: list[Scenario],
                            plot_parameters: PlotParameters) -> FreefallEquationsSolutions:
    scenario_ids = []
    time_array = np.arange(plot_parameters.time_range.min, plot_parameters.time_range.max + 1, dtype=np.intc)
    depth_arrays = []
    velocity_arrays = []

    for s in scenarios:
        mass = diver.weight + s.extra_weight
        initial_conditions = [s.start_depth, s.start_velocity]
        ode_system = equations.get_ode_system(mass=mass, volume_static=diver.volume_static,
                                              volume_compressible=diver.volume_compressible,
                                              drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)
        result = odeint(ode_system, y0=initial_conditions, t=time_array, tfirst=True)
        depth_array = np.round(result.T[0], 2)
        velocity_array = np.round(result.T[1], 2)

        depth_array_with_initial_phase, velocity_array_with_initial_phase = add_initial_phase(depth_array,
                                                                                              velocity_array, s)

        scenario_ids.append(s.id)
        depth_arrays.append(depth_array_with_initial_phase.tolist())
        velocity_arrays.append(velocity_array_with_initial_phase.tolist())

    return FreefallEquationsSolutions(
        scenario_ids=scenario_ids,
        time=time_array.tolist(),
        depth=depth_arrays,
        velocity=velocity_arrays
    )


def add_initial_phase(depth_array: np.ndarray, velocity_array: np.ndarray,
                      s: Scenario) -> tuple[np.ndarray, np.ndarray]:
    time_to_start = int(round(s.start_depth / s.start_velocity))

    depth_initial_array = np.round(np.asarray([s.start_velocity * t for t in range(time_to_start)]), 2)
    depth_array_out = np.concatenate([depth_initial_array, depth_array])

    velocity_initial_array = np.round(np.ones(time_to_start) * s.start_velocity, 2)
    velocity_array_out = np.concatenate([velocity_initial_array, velocity_array])
    return depth_array_out, velocity_array_out
