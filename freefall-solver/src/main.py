import flask

import json_encoder
from json_parsing import parse_divers, parse_scenarios, parse_plot_parameter
from solver import solve_diver_case


def freefall_solver(request: flask.Request):
    request_data = request.get_json()

    response_data = execute(request_data)

    return response_data


def execute(request_data):
    divers = parse_divers(request_data['divers'])
    scenarios = parse_scenarios(request_data['scenarios'])
    plot_parameters = parse_plot_parameter(request_data['plot_parameters'])
    solutions = []
    for diver in divers:
        solution = solve_diver_case(diver, scenarios, plot_parameters)
        solutions.append(solution)
    response_data = json_encoder.CustomEncoder().encode(solutions)
    return response_data
