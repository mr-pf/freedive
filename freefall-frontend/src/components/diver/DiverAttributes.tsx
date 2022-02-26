import {useAppSelector} from "../../store/store";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableRow
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditDiverAttributesDialog from "./EditDiverAttributesDialog";
import {Fragment, useState} from "react";


const DiverAttributes = () => {

    const diver = useAppSelector(state => state.diverCase.diver)
    const [editDiverDialogIsOpen, setEditDiverDialogIsOpen] = useState(false);

    const handleCloseEditDiverDialog = () => {
        setEditDiverDialogIsOpen(false)
    }

    const handleOpenEditDiverDialog = () => {
        setEditDiverDialogIsOpen(true)
    }

    const diverData: [label: string, value: number, unit: string][] = [
        ['Weight', diver.weight, 'Kg'],
        ['Volume static', diver.volumeStatic * 1000, 'l'],
        ['Volume compressible', diver.volumeCompressible * 1000, 'l'],
        ['Drag Area', diver.dragArea, 'm²'],
        ['Drag coefficient', diver.dragCoefficient, '  ']
    ]

    return (
        <Fragment>
            <TableContainer component={Card}>
                <CardHeader title="Diver"/>
                <CardContent>
                    <Table
                        aria-label="scenarios"
                        size="small"
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            }
                        }}
                    >
                        <TableBody>
                            {diverData.map(dd =>
                                <TableRow
                                    key={dd[0]}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{dd[0]}</TableCell>
                                    <TableCell align="left">{dd[1] + ' ' + dd[2]}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Show instructions" onClick={handleOpenEditDiverDialog}>
                        <EditOutlinedIcon/>
                    </IconButton>
                </CardActions>
            </TableContainer>

            <EditDiverAttributesDialog isOpen={editDiverDialogIsOpen} onClose={handleCloseEditDiverDialog}/>
        </Fragment>
    );
}

export default DiverAttributes;

