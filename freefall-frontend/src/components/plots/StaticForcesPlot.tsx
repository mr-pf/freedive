import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette1, reshapeData} from "./plot-helpers";


const StaticForcesPlot = () => {

    const {depth, weights, static_forces_total: forces} = useAppSelector(state => state.solutions.static_forces);

    const labels = weights.map(w => `${w.toString()} Kg`)
    const data = reshapeData(depth, forces, labels)

    return (
        <Card>
            <CardHeader title="Static forces" subheader="For different extra weights"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <XAxis dataKey="depth" type="number" allowDecimals={false}/>
                        <YAxis allowDecimals={false}/>
                        {
                            labels.map((l, i) => <Line key={i}
                                                       type="monotone"
                                                       stroke={colorPalette1[i]}
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

export default StaticForcesPlot