import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {colorPalette1, reshapeData} from "./plot-helpers";


const TerminalVelocityPLot = () => {

    const {diver, scenarios, plotParameters} = useAppSelector(state => state.diverCase);
    const {weights, depth, variable, final} = useAppSelector(state => state.solutions.terminal_velocity);
    const scenarioIds = Object.keys(variable)

    const labels = weights.map(w => `${w.toString()} Kg`)
    const data = reshapeData(depth, variable, labels)

    return (
        <Card>
            <CardHeader title="Terminal velocity" subheader="For different extra weights"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <XAxis dataKey="depth" type="number" allowDecimals={false}/>
                        <YAxis allowDecimals={true} domain={[0, Math.max(...final) * 1.1]}/>
                        {
                            labels.map((l, i) => {
                                    return [
                                        <Line key={i}
                                              type="monotone"
                                              stroke={colorPalette1[i]}
                                              dataKey={l}
                                              dot={false}
                                              isAnimationActive={false}
                                        />,
                                        <ReferenceLine key={i}
                                                       y={final[i]}
                                                       stroke={colorPalette1[i]}
                                                       strokeDasharray="3 3"/>
                                    ]
                                }
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

export default TerminalVelocityPLot