import numpy as np

# Physical constants
water_density = 1023.6  # kg/m³
gravitational_acceleration = 9.807  # m/s²


def gravitational_force(depth: np.array, mass: float) -> np.array:
    return np.ones_like(depth) * (mass * gravitational_acceleration)


def buoyant_force_constant(depth: np.array, volume_static: float) -> np.array:
    return np.ones_like(depth) * (- water_density * gravitational_acceleration * volume_static)


def buoyant_force_variable(depth: np.array, volume_compressible: float) -> np.array:
    return - water_density * gravitational_acceleration * (volume_compressible * 10 / (depth + 10))


def buoyant_force_total(depth: np.array, volume_static: float, volume_compressible: float) -> np.array:
    return buoyant_force_constant(depth, volume_static) + \
           buoyant_force_variable(depth, volume_compressible)


def static_forces_total(depth: np.array, mass: float, volume_static: float, volume_compressible: float) -> np.array:
    return gravitational_force(depth, mass) + \
           buoyant_force_total(depth, volume_static, volume_compressible)


def drag_force(velocity: np.array, drag_coefficient: float, drag_area: float) -> np.array:
    return - 0.5 * water_density * drag_coefficient * drag_area * velocity ** 2


def terminal_velocity(depth: np.array, mass: float, drag_coefficient: float, drag_area: np.array,
                      volume_static: float, volume_compressible: float) \
        -> np.array:
    velocity_square_root = (static_forces_total(depth, mass, volume_static, volume_compressible)) / (
                drag_coefficient * drag_area)

    def square_and_truncate(v):
        return v ** 2 if v >= 0 else None

    return np.array([square_and_truncate(v) for v in velocity_square_root])


def terminal_velocity_final(mass: float, drag_coefficient: float, drag_area: float, volume_static: float) \
        -> float:
    return terminal_velocity(np.ones(1), mass, drag_coefficient, drag_area, volume_static, 0)[0]


def total_forces(depth: float, velocity: float, mass: float, volume_static: float,
                 volume_compressible, drag_coefficient, drag_area):
    return gravitational_force(depth, mass) + \
           buoyant_force_total(depth, volume_static, volume_compressible) + \
           drag_force(velocity, drag_coefficient, drag_area)


def get_ode_system(mass: float, volume_static: float,
                   volume_compressible: float, drag_coefficient: float, drag_area: float):
    def ode_system(_, values):
        d, v = values
        return [
            v,
            total_forces(d, v, mass, volume_static,
                         volume_compressible, drag_coefficient, drag_area) / mass
        ]

    return ode_system
