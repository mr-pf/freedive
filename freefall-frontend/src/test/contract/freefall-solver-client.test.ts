import getSolutions from "../../services/freefall-solver-client";
import {DiverCase} from "../../models/diver-case";
import {DiverCaseSolutions} from "../../models/solution";


const diverCase: DiverCase = {
    diver: {
        weight: 64,
        volumeStatic: 0.062,
        volumeCompressible: 0.006,
        dragArea: 0.07,
        dragCoefficient: 0.3
    },
    scenarios: [
        {id: "1", startDepth: 15, startVelocity: 1.3, extraWeight: 2},
        {id: "2", startDepth: 30, startVelocity: 1.8, extraWeight: 1},
    ],
    plotParameters: {
        timeRange: {min: 0, max: 30, numPoints: 2},
        depthRange: {min: 0, max: 100, numPoints: 2},
        velocityRange: {min: 0, max: 3, numPoints: 4}
    }
};

const diverCaseSolutions: DiverCaseSolutions = {
    static_forces: {
        depth: [0.0, 100.0],
        static_forces_total: {
            "0": [-35.352273599999876, 19.402882036363735],
            "1": [-35.352273599999876, 19.402882036363735]
        }
    },
    terminal_velocity: {
        depth: [0.0, 100.0],
        variable: {
            "0": [null, 1.343610328045689],
            "1": [null, 1.343610328045689]
        },
        final: {
            "0": 1.5214280328315197,
            "1": 1.5214280328315197
        }
    },
    freefall_equations: {
        time: [0.0, 30.0],
        depth: {
            "0": [15.0, 27.249851079401733],
            "1": [15.0, 27.249851079401733]
        },
        velocity: {
            "0": [1.3, 0.17684731898545197],
            "1": [1.3, 0.17684731898545197]
        }
    }
}


test('call to solver function returns successfully with solution', async () => {

    const assertResult = (result: DiverCaseSolutions) => {
        expect(result).toStrictEqual(diverCaseSolutions)
    }

    const handleError = (error: any) => {
        console.log(error)
    }

    await getSolutions(diverCase, assertResult, handleError)

});
