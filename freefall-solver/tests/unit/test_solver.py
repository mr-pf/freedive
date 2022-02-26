from fixtures import DIVER_CASE, PLOT_PARAMETERS, SCENARIOS
from solver import *


def test_solve_diver_case():
    solution = solve_diver_case(DIVER_CASE)

    assert_static_forces(solution.static_forces)
    assert_terminal_velocity(solution.terminal_velocity)
    assert_freefall_equation_solutions(solution.freefall_equations)


def assert_freefall_equation_solutions(solution: FreefallEquationsSolutions):
    assert len(solution.time) == PLOT_PARAMETERS.time_range.num_points + 1
    assert len(solution.depth) == 4
    assert len(solution.velocity) == 4
    for s in SCENARIOS:
        assert s.id in solution.depth
        assert s.id in solution.velocity
        assert solution.time[0] == 0
        assert solution.depth[s.id][0] == 0
        assert solution.velocity[s.id][0] == s.start_velocity


def assert_terminal_velocity(solution: TerminalVelocitySolutions):
    assert len(solution.depth), PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.variable) == 2
    assert len(solution.final) == 2
    for weight in [str(s.extra_weight) for s in SCENARIOS]:
        assert weight in solution.final
        assert weight in solution.variable


def assert_static_forces(solution: StaticForcesSolutions):
    assert len(solution.depth) == PLOT_PARAMETERS.depth_range.num_points
    assert len(solution.static_forces_total) == 2
    for weight in [str(s.extra_weight) for s in SCENARIOS]:
        assert weight in solution.static_forces_total
