export class Diver {
    weight: number;
    volumeStatic: number;
    volumeCompressible: number;
    dragArea: number;
    dragCoefficient: number;

    constructor(weight: number, volumeStatic: number, volumeCompressible: number, dragArea: number,
                dragCoefficient: number) {
        this.weight = weight;
        this.volumeStatic = volumeStatic;
        this.volumeCompressible = volumeCompressible
        this.dragArea = dragArea
        this.dragCoefficient = dragCoefficient
    }
}

export class PlotRange {
    min: number;
    max: number;
    numPoints: number;

    constructor(min: number, max: number, numPoints: number) {
        this.min = min;
        this.max = max;
        this.numPoints = numPoints;
    }
}

export class PlotParameters {
    timeRange: PlotRange;
    depthRange: PlotRange;
    velocityRange: PlotRange;

    constructor(timeRange: PlotRange, depthRange: PlotRange, velocityRange: PlotRange) {
        this.timeRange = timeRange;
        this.depthRange = depthRange;
        this.velocityRange = velocityRange;
    }
}

export class Scenario {
    id: number;
    startDepth: number;
    startVelocity: number;
    extraWeight: number;

    constructor(id: number, startDepth: number, startVelocity: number, extraWeight: number) {
        this.id = id;
        this.startDepth = startDepth;
        this.startVelocity = startVelocity;
        this.extraWeight = extraWeight;
    }
}

// export class DiverCase {
//     diver: Diver;
//     scenarios: { [scenarioId: number]: Scenario };
//     plotParameters: PlotParameters;
//
//     constructor(diver: Diver, scenarios: { [id: number]: Scenario }, plotParameters: PlotParameters) {
//         this.diver = diver;
//         this.scenarios = scenarios;
//         this.plotParameters = plotParameters;
//     }
// }

export type DiverCase = {
    diver: Diver;
    scenarios: { [scenarioId: number]: Scenario };
    plotParameters: PlotParameters;
}