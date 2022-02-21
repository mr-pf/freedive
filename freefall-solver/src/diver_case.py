from collections import namedtuple
from dataclasses import dataclass


@dataclass
class Diver:
    weight: float
    volume_static: float
    volume_compressible: float
    drag_area: float
    drag_coefficient: float


PlotRange = namedtuple('PlotRange', 'min max num_points')


@dataclass
class PlotParameters:
    time_range: PlotRange
    depth_range: PlotRange
    velocity_range: PlotRange


@dataclass
class Scenario:
    id: int
    start_depth: float
    start_velocity: float
    extra_weight: float


@dataclass
class DiverCase:
    diver: Diver
    scenarios: list[Scenario]
    plot_parameters: PlotParameters
