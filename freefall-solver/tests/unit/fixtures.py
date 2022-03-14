import json

from diver_case import Diver, PlotRange, PlotParameters, Scenario, DiverCase

PLOT_PARAMETERS = PlotParameters(
    time_range=PlotRange(0, 30),
    depth_range=PlotRange(0, 100),
    velocity_range=PlotRange(0, 3)
)
DIVER = Diver(
    weight=64,
    volume_static=0.062,
    volume_compressible=0.006,
    drag_area=0.07,
    drag_coefficient=0.3
)
SCENARIOS = [
    Scenario(id="1", start_depth=15, start_velocity=1.3, extra_weight=0),
    Scenario(id="2", start_depth=30, start_velocity=1.8, extra_weight=0),
    Scenario(id="3", start_depth=15, start_velocity=1.8, extra_weight=2),
    Scenario(id="4", start_depth=30, start_velocity=1.8, extra_weight=2),
]

DIVER_CASE = DiverCase(DIVER, SCENARIOS, PLOT_PARAMETERS)

