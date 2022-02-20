from classes import Diver, Scenario, PlotParameters, PlotRange


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
        time_range=PlotRange(min=time_range['min'], max=time_range['max'], num_points=time_range['num_points']),
        depth_range=PlotRange(min=depth_range['min'], max=depth_range['max'], num_points=depth_range['num_points']),
        velocity_range=PlotRange(min=velocity_range['min'], max=velocity_range['max'], num_points=velocity_range['num_points'])
    )