import numpy as np
from scipy.integrate import odeint


from classes import Diver, PlotParameters, Scenario, FreefallEquationSolution, StaticForcesSolution, \
    DynamicForcesSolution, TerminalVelocitySolution, DiverCaseSolution, PlotRange
import equations


def solve_diver_case(diver: Diver, scenarios: list[Scenario], plot_parameters: PlotParameters) -> DiverCaseSolution:
    return DiverCaseSolution(
        diver=diver,
        static_forces=solve_static_forces(diver, plot_parameters),
        dynamic_forces=solve_dynamic_forces(diver, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, plot_parameters),
        freefall_equation_solutions=[solve_freefall_equation(diver, s, plot_parameters) for s in scenarios]
    )


def solve_static_forces(diver: Diver, plot_parameters: PlotParameters) -> StaticForcesSolution:
    depth = get_linspace(plot_parameters.depth_range)

    return StaticForcesSolution(
        depth=list(depth),
        gravitational_force=list(equations.gravitational_force(depth, diver.mass)),
        buoyant_force_constant=list(equations.buoyant_force_constant(depth, diver.volume_static)),
        buoyant_force_variable=list(
            equations.buoyant_force_variable(depth, diver.volume_compressible)),
        buoyant_force_total=list(equations.buoyant_force_total(depth, diver.volume_static, diver.volume_compressible)),
        static_forces_total=list(
            equations.static_forces_total(depth, diver.mass, diver.volume_static, diver.volume_compressible))
    )


def solve_dynamic_forces(diver: Diver, plot_parameters: PlotParameters) -> DynamicForcesSolution:
    velocity = get_linspace(plot_parameters.velocity_range)

    return DynamicForcesSolution(
        velocity=list(velocity),
        drag_force=list(equations.drag_force(velocity, diver.drag_coefficient, diver.drag_area))
    )


def solve_terminal_velocity(diver: Diver, plot_parameters: PlotParameters) -> TerminalVelocitySolution:
    depth = get_linspace(plot_parameters.depth_range)

    return TerminalVelocitySolution(
        depth=list(depth),
        variable=list(equations.terminal_velocity(depth, diver.mass, diver.drag_coefficient,
                                                  diver.drag_area, diver.volume_static, diver.volume_compressible)),
        final=equations.terminal_velocity_final(diver.mass, diver.drag_coefficient,
                                                diver.drag_area, diver.volume_static)
    )


def solve_freefall_equation(diver: Diver, scenario: Scenario,
                            plot_parameters: PlotParameters) -> FreefallEquationSolution:
    ode_system = equations.get_ode_system(mass=diver.mass, volume_static=diver.volume_static,
                                          volume_compressible=diver.volume_compressible,
                                          drag_coefficient=diver.drag_coefficient, drag_area=diver.drag_area)
    time = get_linspace(plot_parameters.time_range)

    initial_conditions = [scenario.start_depth, scenario.start_velocity]
    result = odeint(ode_system, y0=initial_conditions, t=time, tfirst=True)

    return FreefallEquationSolution(
        scenario=scenario,
        time=list(time),
        depth=list(result.T[0]),
        velocity=list(result.T[1])
    )


def get_linspace(plot_range: PlotRange):
    return np.linspace(plot_range.min, plot_range.max, plot_range.num_points)
