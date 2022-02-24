import traceback

import flask
from flask_cors import cross_origin

import json_encoder
from json_parsing import parse_diver_case
from solver import solve_scenarios


@cross_origin()
def freefall_solver(request: flask.Request):
    try:
        request_data = request.get_json()

        diver_case = parse_diver_case(request_data)

        scenario_solutions = solve_scenarios(diver_case)

        response_data = json_encoder.CustomEncoder().encode(scenario_solutions)
        return response_data

    except Exception:
        return traceback.format_exc(), 500
