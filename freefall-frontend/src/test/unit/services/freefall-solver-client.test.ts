import {serializeDiverCase} from "../../../services/freefall-solver-client";
import {DiverCase} from "../../../models/diver-case";


const diverCase: DiverCase = {
    diver: {
        weight: 64,
        volumeStatic: 0.062,
        volumeCompressible: 0.006,
        dragArea: 0.07,
        dragCoefficient: 0.3
    },
    scenarios: [
        {id: 1, startDepth: 15, startVelocity: 1.3, extraWeight: 2},
        {id: 2, startDepth: 30, startVelocity: 1.8, extraWeight: 1},
    ],
    plotParameters: {
        timeRange: {min: 0, max: 30, numPoints: 2},
        depthRange: {min: 0, max: 100, numPoints: 2},
        velocityRange: {min: 0, max: 3, numPoints: 4}
    }
};


test('parsing to request json from camel case to snake case', () => {
    const resultString = serializeDiverCase(diverCase);
    const resultJson = JSON.parse(resultString);

    const expected = require("../../fixtures/request_data.json");

    expect(resultJson).toStrictEqual(expected);
});
