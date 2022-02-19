import flask
from solver import Diver, Scenario, PlotParameters, solve_diver_case
import numpy as np


def freefall_solver(request: flask.Request):
    request_data = request.get_json()

    divers = parse_divers(request_data['divers'])
    scenarios = parse_scenarios(request_data['scenarios'])
    plot_parameters = parse_plot_parameter(request_data['plot parameters'])

    solutions = []

    for diver in divers:
        solution = solve_diver_case(diver, scenarios, plot_parameters)
        solutions.append(solution)

    return flask.jsonify(solutions)


def parse_divers(divers_data: list[dict]) -> list[Diver]:
    return [
        Diver(
            mass=d['mass diver'],  # Kg
            volume_static=d['volume static'],  # m³
            volume_compressible=d['volume tlc'],  # m³
            drag_area=d['drag area'],  # m²
            drag_coefficient=d['drag coefficient']
        ) for d in divers_data]


def parse_scenarios(scenario_data: list[dict]) -> list[Scenario]:
    return [
        Scenario(
            name=s['name'],
            start_depth=s['start depth'],
            start_velocity=s['start velocity']
        ) for s in scenario_data
    ]


def parse_plot_parameter(request_data: dict) -> PlotParameters:
    plot_parameters = request_data['plot parameters']
    time_range = plot_parameters['time range']
    depth_range = plot_parameters['depth range']
    velocity_range = plot_parameters['velocity range']

    return PlotParameters(
        time_range=np.linspace(time_range['min'], time_range['max'], time_range['step size']),
        depth_range=np.linspace(depth_range['min'], depth_range['max'], depth_range['step size']),
        velocity_range=np.linspace(velocity_range['min'], velocity_range['max'], velocity_range['step size'])
    )
