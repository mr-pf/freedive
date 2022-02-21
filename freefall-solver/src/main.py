import flask

import json_encoder
from json_parsing import parse_diver_case
from solver import solve_scenarios


def freefall_solver(request: flask.Request):
    request_data = request.get_json()

    diver_case = parse_diver_case(request_data)

    scenario_solutions = solve_scenarios(diver_case)

    response_data = json_encoder.CustomEncoder().encode(scenario_solutions)
    return response_data
