from diver_case import Diver, PlotRange, PlotParameters, Scenario, DiverCase


def parse_diver_case(json_data) -> DiverCase:
    diver = Diver(**json_data['diver'])
    scenarios = [Scenario(**s) for s in json_data['scenarios']]
    plot_parameters = PlotParameters(
        time_range=PlotRange(**json_data['plot_parameters']['time_range']),
        depth_range=PlotRange(**json_data['plot_parameters']['depth_range']),
        velocity_range=PlotRange(**json_data['plot_parameters']['velocity_range'])
    )

    return DiverCase(diver, scenarios, plot_parameters)
