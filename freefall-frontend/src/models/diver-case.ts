export type Diver = {
    weight: number
    volume_static: number
    volume_compressible: number
    drag_area: number
    drag_coefficient: number
}
export type PlotRange = {
    min: number
    max: number
    numPoints: number
}
export type PlotParameters = {
    time_range: PlotRange
    depth_range: PlotRange
    velocity_range: PlotRange
}
export type Scenario = {
    id: number
    start_depth: number
    start_velocity: number
    extra_weight: number
}

export type DiverCase = {
    diver: Diver
    scenarios: Scenario[]
    plotParameters: PlotParameters
}