from solver import *
from tests.fixtures import PLOT_PARAMETERS, DIVER, SCENARIOS


def test_solve_diver_case():
    result = solve_diver_case(DIVER, SCENARIOS, PLOT_PARAMETERS)

    assert_diver(result)
    assert_static_forces(result)
    assert_dynamic_forces(result)
    assert_terminal_velocity(result)
    assert_freefall_equation_solutions(result)


def assert_freefall_equation_solutions(result):
    num_points = PLOT_PARAMETERS.time_range.num_points
    for i, s in enumerate(SCENARIOS):
        assert result.freefall_equation_solutions[i].scenario == s
        assert len(result.freefall_equation_solutions[i].time) == num_points
        assert len(result.freefall_equation_solutions[i].depth) == num_points
        assert len(result.freefall_equation_solutions[i].velocity) == num_points


def assert_terminal_velocity(result):
    num_points = PLOT_PARAMETERS.depth_range.num_points
    assert len(result.terminal_velocity.depth), num_points
    assert len(result.terminal_velocity.variable) == num_points
    assert round(result.terminal_velocity.final, 2) == 1.52


def assert_dynamic_forces(result):
    num_points = PLOT_PARAMETERS.velocity_range.num_points
    assert len(result.dynamic_forces.velocity) == num_points
    assert len(result.dynamic_forces.drag_force) == num_points


def assert_static_forces(result):
    num_points = PLOT_PARAMETERS.depth_range.num_points
    assert len(result.static_forces.depth) == num_points
    assert len(result.static_forces.gravitational_force) == num_points
    assert len(result.static_forces.buoyant_force_constant) == num_points
    assert len(result.static_forces.buoyant_force_variable) == num_points
    assert len(result.static_forces.buoyant_force_total) == num_points
    assert len(result.static_forces.static_forces_total) == num_points


def assert_diver(result):
    assert result.diver == DIVER
