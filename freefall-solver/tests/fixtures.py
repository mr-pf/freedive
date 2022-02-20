from classes import PlotParameters, Diver, Scenario, PlotRange

PLOT_PARAMETERS = PlotParameters(
    time_range=PlotRange(0, 30, 2),
    depth_range=PlotRange(0, 100, 2),
    velocity_range=PlotRange(0, 3, 4)
)
DIVER = Diver(
    mass=66,
    volume_static=0.062,
    volume_compressible=0.006,
    drag_area=0.07,
    drag_coefficient=0.3
)
SCENARIOS = [
    Scenario(name='test1', start_depth=15, start_velocity=1.3),
    Scenario(name='test2', start_depth=30, start_velocity=1.8)
]