import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import { LineChart, Line } from 'recharts';
import {Scenario} from "../../models/diver-case";


const StaticForcesPlot = () => {

    const getScenarioName = (scenario: Scenario) => {
        return `depth: ${scenario.startDepth} velocity: ${scenario.startVelocity} weight: ${scenario.extraWeight}`
    }s

    const solutions = useAppSelector(state => state.solutions);
    const scenarios = useAppSelector(state => state.diverCase.scenarios);

    const depth = solutions[0].depth
    const static_forces = solutions.map(s => {s.id: s.static_forces)

    const static_foces



    return (
        <Card>
            <CardHeader title="Static forces"/>
                <CardContent>
                    <LineChart>

                    </LineChart>
                </CardContent>
        </Card>
    );


}

export default StaticForcesPlot