import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette, reshapeData} from "./plot-helpers";


const FreefallEquationsVelocityPLot = () => {

    const {diver, scenarios, plotParameters} = useAppSelector(state => state.diverCase);
    const {time, velocity} = useAppSelector(state => state.solutions.freefall_equations);
    const scenarioIds = Object.keys(velocity)

    const data = reshapeData(time, velocity)
    console.log(data)

    return (
        <Card>
            <CardHeader title="Time vs. velocity"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" type="number" allowDecimals={false}/>
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
                        <CartesianGrid/>
                        <Tooltip/>
                        <Legend/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );


}

export default FreefallEquationsVelocityPLot