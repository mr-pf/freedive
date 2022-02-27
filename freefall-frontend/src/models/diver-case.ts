export type Diver = {
    weight: number;
    volume_static: number;
    volume_compressible: number;
    drag_area: number;
    drag_coefficient: number;
}

export type Scenario = {
    id: string;
    start_depth: number;
    start_velocity: number;
    extra_weight: number;
}

export type PlotRange = {
    min: number;
    max: number;
    num_points: number;
}

export type PlotParameters = {
    time_range: PlotRange;
    depth_range: PlotRange;
    velocity_range: PlotRange;
}

export type DiverCase = {
    diver: Diver;
    scenarios: Scenario[];
    plot_parameters: PlotParameters;
}