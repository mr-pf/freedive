import flask
import numpy as np
import jsonpickle

from classes import Diver, PlotParameters, Scenario
from solver import solve_diver_case


def freefall_solver(request: flask.Request):
    request_data = request.get_json()

    divers = parse_divers(request_data['divers'])
    scenarios = parse_scenarios(request_data['scenarios'])
    plot_parameters = parse_plot_parameter(request_data['plot_parameters'])

    solutions = []

    for diver in divers:
        solution = solve_diver_case(diver, scenarios, plot_parameters)
        solutions.append(solution)

    response_data = jsonpickle.encode(solutions)
    return response_data


def parse_divers(divers_data: list[dict]) -> list[Diver]:
    divers = []
    for d in divers_data:
        diver = Diver(
            mass=d['mass'],  # Kg
            volume_static=d['volume_static'],  # m³
            volume_compressible=d['volume_compressible'],  # m³
            drag_area=d['drag_area'],  # m²
            drag_coefficient=d['drag_coefficient']
        )
        divers.append(diver)

    return divers


def parse_scenarios(scenario_data: list[dict]) -> list[Scenario]:
    return [
        Scenario(
            name=s['name'],
            start_depth=s['start_depth'],
            start_velocity=s['start_velocity']
        ) for s in scenario_data
    ]


def parse_plot_parameter(plot_parameter_data: dict) -> PlotParameters:
    time_range = plot_parameter_data['time_range']
    depth_range = plot_parameter_data['depth_range']
    velocity_range = plot_parameter_data['velocity_range']

    return PlotParameters(
        time_range=np.linspace(time_range['min'], time_range['max'], time_range['num_data_points']),
        depth_range=np.linspace(depth_range['min'], depth_range['max'], depth_range['num_data_points']),
        velocity_range=np.linspace(velocity_range['min'], velocity_range['max'], velocity_range['num_data_points'])
    )
