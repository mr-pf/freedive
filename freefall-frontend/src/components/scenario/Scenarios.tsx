import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/store";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {diverCaseActions} from "../../store/diver-case-slice";
import {Fragment, useState} from "react";
import EditScenarioDialog from "./EditScenarioDialog";
import {Scenario} from "../../models/diver-case";

const defaultScenario: Scenario = {id: "0", startDepth: 20, startVelocity: 1.5, extraWeight: 0}

const Scenarios = () => {

    const scenarios = useAppSelector(state => state.diverCase.scenarios)
    const dispatch = useAppDispatch();

    const [editScenarioDialogProps, setEditScenarioDialogProps] =
        useState({isOpen: false, scenario: defaultScenario});


    const handleAddScenario = () => {
        const ids = scenarios.map(s => s.id)
        const newScenarioId = ids.length === 0 ? "0" : Math.max(...ids.map(i => parseInt(i))) + 1

        const newScenario = {...defaultScenario, id: newScenarioId.toString()}

        setEditScenarioDialogProps({isOpen: true, scenario: newScenario})
    }


    const handleEditScenario = (scenario: Scenario) => {
        setEditScenarioDialogProps({isOpen: true, scenario: scenario})
    }


    const handleDeleteScenario = (scenario: Scenario) => {
        dispatch(diverCaseActions.deleteScenario(scenario))
    }


    const handleCloseEditscenarioDialog = () => {
        setEditScenarioDialogProps(prev => {
            return {...prev, isOpen: false}
        })
    }


    return (
        <Fragment>
            <TableContainer component={Card}>
                <CardHeader title="Scenarios"/>
                <CardContent>
                    <Table aria-label="scenarios" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Start depth [m]</TableCell>
                                <TableCell align="right">Start velocity [m/s]</TableCell>
                                <TableCell align="right">Extra weight [Kg]</TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(scenarios).map((s) => (
                                <TableRow
                                    key={s.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="right">{s.startDepth}</TableCell>
                                    <TableCell align="right">{s.startVelocity}</TableCell>
                                    <TableCell align="right">{s.extraWeight}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row">
                                            <IconButton onClick={() => handleEditScenario(s)} sx={{width: 30, height: 13}}>
                                                <EditOutlinedIcon sx={{width: 15, height: 15}}/>
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteScenario(s)} sx={{width: 30, height: 15}}>
                                                <ClearOutlinedIcon sx={{width: 15, height: 15}}/>
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Show instructions"
                                onClick={handleAddScenario}
                                disabled={scenarios.length >= 8}>
                        <AddCircleOutlineOutlinedIcon/>
                    </IconButton>
                </CardActions>
            </TableContainer>

            <EditScenarioDialog isOpen={editScenarioDialogProps.isOpen}
                                scenario={editScenarioDialogProps.scenario}
                                onClose={handleCloseEditscenarioDialog}/>
        </Fragment>
    );
}

export default Scenarios;