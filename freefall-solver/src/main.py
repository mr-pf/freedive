import traceback

import flask
from flask_cors import cross_origin

import json_encoder
from json_parsing import parse_diver_case
from solver import solve_diver_case


@cross_origin()
def freefall_solver(request: flask.Request):
    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    try:
        request_data = request.get_json()

        diver_case = parse_diver_case(request_data)

        solution = solve_diver_case(diver_case)

        response_data = json_encoder.CustomEncoder().encode(solution)
        return response_data

    except Exception:
        return traceback.format_exc(), 500, headers
