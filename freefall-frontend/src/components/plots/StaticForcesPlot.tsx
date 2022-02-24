import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {Line, LineChart, XAxis, YAxis} from 'recharts';


const StaticForcesPlot = () => {

    const scenarios = useAppSelector(state => state.diverCase.scenarios);
    const getScenarioName = (scenarioId: number) => {
        const scenario = scenarios[scenarioId]
        return `id:${scenarioId} sd:${scenario.startDepth} sv:${scenario.startVelocity} ew:${scenario.extraWeight}`
    }

    const solutions = useAppSelector(state => state.solutions.static_forces);
    const depth = solutions.depth;
    const forces = solutions.static_forces_total;
    const scenarioIds = Object.keys(forces)

    const data = depth.map((d, i) => {
        let scenarioValues = Object.assign({}, ...scenarioIds.map((id) => ({[id]: forces[id][i]})));
        return {
            depth: d,
            ...scenarioValues
        }
    })

    console.log(data)

    return (
        <Card>
            <CardHeader title="Static forces"/>
            <CardContent>
                <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="depth"/>
                    <YAxis/>
                    {
                        scenarioIds.map(id => <Line type="monotone" dataKey={id} stroke="#82ca9d"/>)
                    }
                </LineChart>
            </CardContent>
        </Card>
    );


}

export default StaticForcesPlot