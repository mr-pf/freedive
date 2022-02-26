from solver import *
from tests.fixtures import PLOT_PARAMETERS, DIVER_CASE


def test_solve_diver_case():
    solution = solve_diver_case(DIVER_CASE)

    assert_static_forces(solution.static_forces)
    assert_terminal_velocity(solution.terminal_velocity)
    assert_freefall_equation_solutions(solution.freefall_equations)


def assert_freefall_equation_solutions(solution: FreefallEquationsSolutions):
    assert len(solution.time) == PLOT_PARAMETERS.time_range.num_points
    assert len(solution.depth) == 2
    assert len(solution.velocity) == 2


def assert_terminal_velocity(solution: TerminalVelocitySolutions):
    assert len(solution.depth), PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.variable) == 2
    assert len(solution.final) == 2


def assert_static_forces(solution: StaticForcesSolutions):
    assert len(solution.depth) == PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.static_forces_total) == 2
