from solver import *
from tests.fixtures import PLOT_PARAMETERS, DIVER, SCENARIOS, DIVER_CASE


def test_solve_diver_case():
    scenario_solutions = solve_scenarios(DIVER_CASE)

    for sc in scenario_solutions:
        assert_static_forces(sc.static_forces)
        assert_terminal_velocity(sc.terminal_velocity)
        assert_freefall_equation_solutions(sc.freefall_equations)


def assert_freefall_equation_solutions(solution: FreefallEquationsSolution):
    num_points = PLOT_PARAMETERS.time_range.num_points
    assert len(solution.time) == num_points
    assert len(solution.depth) == num_points
    assert len(solution.velocity) == num_points


def assert_terminal_velocity(solution: TerminalVelocitySolution):
    num_points = PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.depth), num_points
    assert len(solution.variable) == num_points
    assert round(solution.final, 2) == 1.52


def assert_static_forces(solution: StaticForcesSolution):
    num_points = PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.depth) == num_points
    assert len(solution.static_forces_total) == num_points
