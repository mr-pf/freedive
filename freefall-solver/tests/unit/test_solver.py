from fixtures import DIVER_CASE, PLOT_PARAMETERS, SCENARIOS
from solver import *


def test_solve_diver_case():
    solution = solve_diver_case(DIVER_CASE)

    assert_static_forces(solution.static_forces)
    assert_terminal_velocity(solution.terminal_velocity)
    assert_freefall_equation_solutions(solution.freefall_equations)


def assert_freefall_equation_solutions(solution: FreefallEquationsSolutions):
    assert len(solution.time) == 31
    assert len(solution.depth) == 4
    assert len(solution.velocity) == 4
    for s in SCENARIOS:
        assert s.id in solution.scenario_ids

    assert solution.time[0] == 0

    for d in solution.depth:
        assert d[0] == 0

    for i, v in enumerate(solution.velocity):
        assert v[0] == SCENARIOS[i].start_velocity


def assert_terminal_velocity(solution: TerminalVelocitySolutions):
    assert len(solution.depth) == 101
    assert len(solution.variable) == 2
    assert len(solution.final) == 2
    for total_weight in [64, 66]:
        assert total_weight in solution.weights


def assert_static_forces(solution: StaticForcesSolutions):
    assert len(solution.depth) == 101
    assert len(solution.static_forces_total) == 2
    for total_weight in [64, 66]:
        assert total_weight in solution.weights
