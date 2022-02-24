export type Diver = {
    weight: number;
    volumeStatic: number;
    volumeCompressible: number;
    dragArea: number;
    dragCoefficient: number;
}

export type Scenario = {
    id: string;
    startDepth: number;
    startVelocity: number;
    extraWeight: number;
}

export type PlotRange = {
    min: number;
    max: number;
    numPoints: number;
}

export type PlotParameters = {
    timeRange: PlotRange;
    depthRange: PlotRange;
    velocityRange: PlotRange;
}

export type DiverCase = {
    diver: Diver;
    scenarios: Scenario[];
    plotParameters: PlotParameters;
}