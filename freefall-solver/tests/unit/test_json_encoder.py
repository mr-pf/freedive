from json_encoder import CustomEncoder
from solution import ScenarioSolution, StaticForcesSolution, TerminalVelocitySolution, FreefallEquationsSolution

SCENARIO_SOLUTIONS = {
    0: ScenarioSolution(
        static_forces=StaticForcesSolution(
            depth=[1],
            static_forces_total=[2]
        ),
        terminal_velocity=TerminalVelocitySolution(
            depth=[3],
            variable=[4],
            final=5
        ),
        freefall_equations=FreefallEquationsSolution(
            depth=[6],
            velocity=[7],
            time=[8]
        )
    )
}

JSON = '{"0": {"static_forces": {"depth": [1], "static_forces_total": [2]}, "terminal_velocity": {"depth": [3], "variable": [4], "final": 5}, "freefall_equations": {"time": [8], "depth": [6], "velocity": [7]}}}'


def test_json_encoder():
    result = CustomEncoder().encode(SCENARIO_SOLUTIONS)

    assert result == JSON
