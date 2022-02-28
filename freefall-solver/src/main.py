import traceback

import flask

import json_encoder
from json_parsing import parse_diver_case
from solver import solve_diver_case


def freefall_solver(request: flask.Request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return '', 204, headers

    headers = {'Access-Control-Allow-Origin': '*'}

    try:
        request_data = request.get_json()

        diver_case = parse_diver_case(request_data)

        solution = solve_diver_case(diver_case)

        response_data = json_encoder.CustomEncoder().encode(solution)
        return response_data, 200, headers

    except Exception:
        return traceback.format_exc(), 500, headers
