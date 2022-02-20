from scipy.integrate import odeint

import equations
from classes import Diver, PlotParameters, Scenario, FreefallEquationSolution, StaticForcesSolution, \
    DynamicForcesSolution, TerminalVelocitySolution, DiverCaseSolution


def solve_diver_case(diver: Diver, scenarios: list[Scenario], plot_parameters: PlotParameters) -> DiverCaseSolution:
    return DiverCaseSolution(
        diver=diver,
        static_forces=solve_static_forces(diver, plot_parameters),
        dynamic_forces=solve_dynamic_forces(diver, plot_parameters),
        terminal_velocity=solve_terminal_velocity(diver, plot_parameters),
        freefall_equation_solutions=[solve_freefall_equation(diver, s, plot_parameters) for s in scenarios]
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


def solve_freefall_equation(diver: Diver, scenario: Scenario,
                            plot_parameters: PlotParameters) -> FreefallEquationSolution:
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
