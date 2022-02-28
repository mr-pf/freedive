import numpy as np
import pytest

import equations

DEPTH = np.array([0, 10, 100])
VELOCITY = np.array([0, 1, 2])
MASS = 66
VOLUME_COMPRESSIBLE = 0.006
VOLUME_STATIC = 0.062
DRAG_COEFFICIENT = 0.3
DRAG_AREA = 0.07


def test_gravitational_force():
    result = equations.gravitational_force(DEPTH, MASS)
    expected = np.array([647.26, 647.26, 647.26])

    assert np.array_equal(expected, np.round(result, 2))


def test_buoyant_force_constant():
    result = equations.buoyant_force_constant(DEPTH, VOLUME_STATIC)
    expected = np.array([-622.38, -622.38, -622.38])

    assert np.array_equal(expected, np.round(result, 2))


def test_buoyant_force_variable():
    result = equations.buoyant_force_variable(DEPTH, VOLUME_COMPRESSIBLE)
    expected = np.array([-60.23, -30.12, -5.48])

    assert np.array_equal(expected, np.round(result, 2))


def test_buoyant_force_total():
    result = equations.buoyant_force_total(DEPTH, VOLUME_STATIC, VOLUME_COMPRESSIBLE)
    expected = np.array([-682.61, -652.5, -627.86])

    assert np.array_equal(expected, np.round(result, 2))


def test_static_forces_total():
    result = equations.static_forces_total(DEPTH, MASS, VOLUME_STATIC, VOLUME_COMPRESSIBLE)
    expected = np.array([-35.35, -5.24, 19.4])

    assert np.array_equal(expected, np.round(result, 2))


def test_drag_force():
    result = equations.drag_force(VELOCITY, DRAG_COEFFICIENT, DRAG_AREA)
    expected = np.array([-0., -10.75, -42.99])

    assert np.array_equal(expected, np.round(result, 2))


def test_terminal_velocity():
    result = equations.terminal_velocity(DEPTH, MASS, DRAG_COEFFICIENT, DRAG_AREA, VOLUME_STATIC, VOLUME_COMPRESSIBLE)
    expected = np.array([-1.81, -0.7, 1.34])

    result_rounded = np.array([round(v, 2) if v else None for v in result])

    assert np.array_equal(expected, result_rounded)


def test_terminal_velocity_final():
    result = equations.terminal_velocity_final(MASS, DRAG_COEFFICIENT, DRAG_AREA, VOLUME_STATIC)
    expected = 1.52

    assert expected == round(result, 2)


@pytest.mark.parametrize('input_', [
    ([20, 1]),
    ([20, 1.5]),
    ([30, 1]),
    ([30, 1.5])
])
def test_get_ode_system(input_):
    ode_system = equations.get_ode_system(MASS, VOLUME_STATIC, VOLUME_COMPRESSIBLE, DRAG_COEFFICIENT, DRAG_AREA)

    result = ode_system(None, input_)

    assert input_[1] == result[0]
