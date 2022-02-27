import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette2, getScenarioName, reshapeData} from "./plot-helpers";


const FreefallEquationsDepthPlot = () => {

    const {diver, scenarios, plotParameters} = useAppSelector(state => state.diverCase);
    const {scenario_ids, time, depth} = useAppSelector(state => state.solutions.freefall_equations);

    const scenariosById = Object.assign({}, ...scenarios.map(s => ({[s.id]: s})))
    console.log(scenariosById)
    const labels = scenario_ids.map(i => getScenarioName(scenariosById[i]))

    const data = reshapeData(time, depth, labels)

    console.log(data)

    return (
        <Card>
            <CardHeader title="Time vs. depth"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" type="number" allowDecimals={false}/>
                        <YAxis allowDecimals={false}/>
                        {
                            scenario_ids.map((l, i) => <Line key={i}
                                                             type="monotone"
                                                             stroke={colorPalette2[i]}
                                                             dataKey={l}
                                                             dot={false}
                                                             isAnimationActive={false}
                                />
                            )
                        }
                        <CartesianGrid/>
                        <Tooltip/>
                        <Legend/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );


}

export default FreefallEquationsDepthPlot