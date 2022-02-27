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
import {colorPalette1, reshapeAndRoundData} from "./plot-helpers";


const TerminalVelocityPLot = () => {

    const {plot_parameters} = useAppSelector(state => state.solutions.diver_case);
    const {weights, depth, variable, final} = useAppSelector(state => state.solutions.terminal_velocity);

    const labels = weights.map(w => `${w.toString()} Kg`)
    const data = reshapeAndRoundData(depth, variable, labels)
    const finalRounded = final.map(v => Math.round(v * 100) / 100)

    return (
        <Card>
            <CardHeader title="Terminal velocity" subheader="For different extra weights"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <XAxis dataKey="x"
                               type="number"
                               allowDecimals={false}
                               domain={[plot_parameters.depth_range.min, plot_parameters.depth_range.max]}
                               stroke="white"
                               label={{value: "depth [m]", dy: 20, fill: "white"}}

                        />
                        <YAxis allowDecimals={false}
                               domain={['auto', Math.max(...finalRounded) * 1.1]}
                               stroke="white"
                               label={{value: "velocity [m/s]", angle: -90, dx: -10, fill: "white"}}
                        />
                        {
                            labels.map((l, i) => {
                                    return [
                                        <Line key={i}
                                              type="monotone"
                                              stroke={colorPalette1[i]}
                                              strokeWidth={2}
                                              dataKey={l}
                                              dot={false}
                                              isAnimationActive={false}
                                        />,
                                        <ReferenceLine key={i}
                                                       y={finalRounded[i]}
                                                       stroke={colorPalette1[i]}
                                                       strokeWidth={2.5}
                                                       strokeDasharray="3 3"/>
                                    ]
                                }
                            )
                        }
                        <CartesianGrid/>
                        <Tooltip/>
                        <Legend wrapperStyle={{bottom: -20}}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );


}

export default TerminalVelocityPLot