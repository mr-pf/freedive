import {useAppSelector} from "../../store/store";
import {Card, CardContent, CardHeader} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {colorPalette2, getScenarioName, getScenariosById, reshapeAndRoundData} from "./plot-helpers";


const FreefallEquationsDepthPlot = () => {

    const {scenarios, plot_parameters} = useAppSelector(state => state.solutions.diver_case);
    const {scenario_ids, time, depth} = useAppSelector(state => state.solutions.freefall_equations);

    const scenariosById = getScenariosById(scenarios)
    const labels = scenario_ids.map(i => getScenarioName(scenariosById[i]))

    const data = reshapeAndRoundData(time, depth, labels)

    return (
        <Card>
            <CardHeader title="Time vs. depth" subheader="For each scenario"/>
            <CardContent>
                <ResponsiveContainer width="95%" height={230}>
                    <LineChart data={data}>
                        <CartesianGrid/>
                        <XAxis dataKey="x"
                               type="number"
                               allowDecimals={false}
                               stroke="white"
                               strokeWidth={1}
                               label={{value: "time [s]", dy: 20, fill: "white"}}
                               domain={[plot_parameters.time_range.min, plot_parameters.time_range.max]}
                        />
                        <YAxis allowDecimals={false}
                               stroke="white"
                               strokeWidth={1}
                               label={{value: "depth [m]", angle: -90, dx: -20, fill: "white"}}
                               domain={[plot_parameters.depth_range.min, plot_parameters.depth_range.max]}
                        />
                        {
                            labels.map((l, i) => <Line key={i}
                                                       type="monotone"
                                                       stroke={colorPalette2[i]}
                                                       strokeWidth={2}
                                                       dataKey={l}
                                                       dot={false}
                                                       isAnimationActive={false}
                                />
                            )
                        }
                        <Tooltip/>
                        <Legend wrapperStyle={{bottom: -20}}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );


}

export default FreefallEquationsDepthPlot