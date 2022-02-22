import {
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppSelector} from "../../store/store";

const Scenarios = () => {

    const scenarios = useAppSelector(state => state.diverCase.scenarios)

    return (
        <Card>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table aria-label="scenarios" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Start depth [m]</TableCell>
                                <TableCell align="right">Start velocity [m/s]</TableCell>
                                <TableCell align="right">Extra weight [Kg]</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(scenarios).map((scenario) => (
                                <TableRow
                                    key={scenario.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="right">{scenario.startDepth}</TableCell>
                                    <TableCell align="right">{scenario.startVelocity}</TableCell>
                                    <TableCell align="right">{scenario.extraWeight}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );

}

export default Scenarios;