from json_encoder import CustomEncoder
from solution import DiverCaseSolutions, StaticForcesSolutions, TerminalVelocitySolutions, FreefallEquationsSolutions

SCENARIO_SOLUTIONS = DiverCaseSolutions(
    static_forces=StaticForcesSolutions(
        depth=[1],
        static_forces_total={'0': [2]}
    ),
    terminal_velocity=TerminalVelocitySolutions(
        depth=[3],
        variable={'0': [None, 4]},
        final={'0': 5}
    ),
    freefall_equations=FreefallEquationsSolutions(
        time=[6],
        depth={'0': [7]},
        velocity={'0': [8]}
    )
)

JSON = ('{"static_forces": {"depth": [1], "static_forces_total": {"0": [2]}}, ' +
        '"terminal_velocity": {"depth": [3], "variable": {"0": [null, 4]}, "final": {"0": 5}}, ' +
        '"freefall_equations": {"time": [6], "depth": {"0": [7]}, "velocity": {"0": [8]}}}')


def test_json_encoder():
    result = CustomEncoder().encode(SCENARIO_SOLUTIONS)

    assert result == JSON
