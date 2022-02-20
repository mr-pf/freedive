import numpy as np

from src.solver import *
from tests.fixtures import PLOT_PARAMETERS, DIVER, SCENARIOS


def test_solve_diver_case():
    result = solve_diver_case(DIVER, SCENARIOS, PLOT_PARAMETERS)

    assert_diver(result)
    assert_static_forces(result)
    assert_dynamic_forces(result)
    assert_terminal_velocity(result)
    assert_freefall_equation_solutions(result)


def assert_freefall_equation_solutions(result):
    for i, s in enumerate(SCENARIOS):
        assert result.freefall_equation_solutions[i].scenario == s
        assert np.array_equal(result.freefall_equation_solutions[i].time, PLOT_PARAMETERS.time_range)
        assert result.freefall_equation_solutions[i].depth.shape == PLOT_PARAMETERS.time_range.shape
        assert result.freefall_equation_solutions[i].velocity.shape == PLOT_PARAMETERS.time_range.shape


def assert_terminal_velocity(result):
    assert np.array_equal(result.terminal_velocity.depth, PLOT_PARAMETERS.depth_range)
    assert result.terminal_velocity.variable.shape == PLOT_PARAMETERS.depth_range.shape
    assert round(result.terminal_velocity.final, 2) == 1.52


def assert_dynamic_forces(result):
    assert np.array_equal(result.dynamic_forces.velocity, PLOT_PARAMETERS.velocity_range)
    assert result.dynamic_forces.drag_force.shape == PLOT_PARAMETERS.velocity_range.shape


def assert_static_forces(result):
    assert np.array_equal(result.static_forces.depth, PLOT_PARAMETERS.depth_range)
    assert result.static_forces.gravitational_force.shape == PLOT_PARAMETERS.depth_range.shape
    assert result.static_forces.buoyant_force_constant.shape == PLOT_PARAMETERS.depth_range.shape
    assert result.static_forces.buoyant_force_variable.shape == PLOT_PARAMETERS.depth_range.shape
    assert result.static_forces.buoyant_force_total.shape == PLOT_PARAMETERS.depth_range.shape
    assert result.static_forces.static_forces_total.shape == PLOT_PARAMETERS.depth_range.shape


def assert_diver(result):
    assert result.diver == DIVER
