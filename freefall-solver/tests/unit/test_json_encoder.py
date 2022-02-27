from json_encoder import CustomEncoder
from solution import DiverCaseSolutions, StaticForcesSolutions, TerminalVelocitySolutions, FreefallEquationsSolutions

SCENARIO_SOLUTIONS = DiverCaseSolutions(
    static_forces=StaticForcesSolutions(
        weights=[9],
        depth=[1],
        static_forces_total=[[2]]
    ),
    terminal_velocity=TerminalVelocitySolutions(
        weights=[9],
        depth=[3],
        variable=[[1, 4]],
        final=[5]
    ),
    freefall_equations=FreefallEquationsSolutions(
        scenario_ids=["0"],
        time=[6],
        depth=[[7]],
        velocity=[[8]]
    )
)

JSON = ('{"static_forces": {"weights": [9], "depth": [1], "static_forces_total": [[2]]}, '
        '"terminal_velocity": {"weights": [9], "depth": [3], "variable": [[1, 4]], "final": [5]}, '
        '"freefall_equations": {"scenario_ids": ["0"], "time": [6], "depth": [[7]], "velocity": [[8]]}}')


def test_json_encoder():
    result = CustomEncoder().encode(SCENARIO_SOLUTIONS)

    assert result == JSON
