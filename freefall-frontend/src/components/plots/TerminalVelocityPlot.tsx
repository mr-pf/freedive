import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette, reshapeData} from "./plot-helpers";


const TerminalVelocityPLot = () => {

    const {diver, scenarios, plotParameters} = useAppSelector(state => state.diverCase);
    const {depth, variable, final} = useAppSelector(state => state.solutions.terminal_velocity);
    const scenarioIds = Object.keys(variable)

    const data = reshapeData(depth, variable)

    console.log(data)

    return (
        <Card>
            <CardHeader title="Terminal velocity"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="depth" type="number" allowDecimals={false}/>
                        <YAxis allowDecimals={true}/>
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
                        <Line points={[{x: 0, y: 0}, {x: plotParameters.depthRange.max, y: 0}]}
                              stroke="red"
                              dot={false}
                              type="monotone"
                              isAnimationActive={false}
                        />
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