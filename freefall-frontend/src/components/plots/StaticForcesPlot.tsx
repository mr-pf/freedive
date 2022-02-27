import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette1, reshapeAndRoundData} from "./plot-helpers";


const StaticForcesPlot = () => {

    const {plot_parameters} = useAppSelector(state => state.solutions.diver_case);
    const {depth, weights, static_forces_total: forces} = useAppSelector(state => state.solutions.static_forces);

    const labels = weights.map(w => `${w.toString()} Kg`)
    const data = reshapeAndRoundData(depth, forces, labels)

    return (
        <Card>
            <CardHeader title="Static forces" subheader="For different extra weights"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <XAxis dataKey="x"
                               type="number"
                               allowDecimals={false}
                               domain={[plot_parameters.depth_range.min, plot_parameters.depth_range.max]}
                               stroke="white"
                               strokeWidth={1}
                               label={{ value: "depth [m]", dy: 20, fill: "white"}}
                        />
                        <YAxis allowDecimals={false}
                               stroke="white"
                               strokeWidth={1}
                               label={{ value: "force [N]", angle: -90,   dx: -10, fill: "white"}}
                        />
                        {
                            labels.map((l, i) => <Line key={i}
                                                       type="monotone"
                                                       stroke={colorPalette1[i]}
                                                       strokeWidth={2}
                                                       dataKey={l}
                                                       dot={false}
                                                       isAnimationActive={false}
                                />
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

export default StaticForcesPlot