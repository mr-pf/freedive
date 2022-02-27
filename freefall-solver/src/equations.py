import numpy as np

# Physical constants
water_density = 1023.6  # kg/m³
gravitational_acceleration = 9.807  # m/s²
buoyancy_coefficient = water_density * gravitational_acceleration


def gravitational_force(depth: np.ndarray, mass: float) -> np.ndarray:
    return np.ones_like(depth) * (mass * gravitational_acceleration)


def buoyant_force_constant(depth: np.ndarray, volume_static: float) -> np.ndarray:
    return np.ones_like(depth) * (- buoyancy_coefficient * volume_static)


def buoyant_force_variable(depth: np.ndarray, volume_compressible: float) -> np.ndarray:
    return - buoyancy_coefficient * (volume_compressible * 10 / (depth + 10))


def buoyant_force_total(depth: np.ndarray, volume_static: float, volume_compressible: float) -> np.ndarray:
    return buoyant_force_constant(depth, volume_static) + \
           buoyant_force_variable(depth, volume_compressible)


def static_forces_total(depth: np.ndarray, mass: float, volume_static: float, volume_compressible: float) -> np.ndarray:
    return gravitational_force(depth, mass) + \
           buoyant_force_total(depth, volume_static, volume_compressible)


def get_resistive_coefficient(drag_coefficient: float, drag_area: float):
    return 0.5 * water_density * drag_coefficient * drag_area


def drag_force(velocity: np.ndarray, drag_coefficient: float, drag_area: float) -> np.ndarray:
    resistive_coefficient = get_resistive_coefficient(drag_coefficient, drag_area)
    return - resistive_coefficient * velocity ** 2


def terminal_velocity(depth: np.ndarray, mass: float, drag_coefficient: float, drag_area: float,
                      volume_static: float, volume_compressible: float) \
        -> np.ndarray:
    static_forces = static_forces_total(depth, mass, volume_static, volume_compressible)
    resistive_coefficient = get_resistive_coefficient(drag_coefficient, drag_area)

    velocity_square_root = static_forces / resistive_coefficient

    def square_root_with_sign(v):
        return v / abs(v) * abs(v) ** 0.5

    return np.array([square_root_with_sign(v) for v in velocity_square_root])


def terminal_velocity_final(mass: float, drag_coefficient: float, drag_area: float, volume_static: float) \
        -> float:
    return terminal_velocity(np.ones(1), mass, drag_coefficient, drag_area, volume_static, 0)[0]


def get_ode_system(mass: float, volume_static: float,
                   volume_compressible: float, drag_coefficient: float, drag_area: float):
    def ode_system(_, values):
        d, v = values
        return [
            v,
            (
                    mass * gravitational_acceleration /
                    - buoyancy_coefficient * volume_static /
                    - buoyancy_coefficient * (volume_compressible * 10 / (d + 10))
                    - get_resistive_coefficient(drag_coefficient, drag_area) * abs(v) * v
            ) / mass
        ]

    return ode_system
