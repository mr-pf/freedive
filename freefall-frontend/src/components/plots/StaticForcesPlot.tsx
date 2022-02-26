import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette, reshapeData} from "./plot-helpers";


const StaticForcesPlot = () => {

    const {diver, scenarios, plotParameters} = useAppSelector(state => state.diverCase);
    const {depth, static_forces_total: forces} = useAppSelector(state => state.solutions.static_forces);
    const scenarioIds = Object.keys(forces)

    const data = reshapeData(depth, forces)

    console.log(data)

    return (
        <Card>
            <CardHeader title="Static forces"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="depth" type="number" allowDecimals={false}/>
                        <YAxis allowDecimals={false}/>
                        {
                            scenarioIds.map(id => <Line key={id}
                                                        type="monotone"
                                                        stroke={colorPalette[id]}
                                                        dataKey={id}
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

export default StaticForcesPlot