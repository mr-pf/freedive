import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableRow
} from "@mui/material";
import ChangeValueSlider from "./ChangeValueSlider";


export type EditDialogDisplayData = {
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    unit: string,
    onChange: (value: number) => void
}


const EditDialog = (props: {
    title: string,
    isOpen: boolean,
    onCancel: () => void,
    onSave: () => void,
    data: EditDialogDisplayData[]
}) => {


    return (
        <Dialog open={props.isOpen} onClose={props.onCancel} fullWidth={true}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {/*<TableContainer component={Paper}>*/}
                <Table
                    size="small"
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none"
                        }
                    }}
                >
                    <TableBody>
                        {props.data.map(d =>
                            <TableRow
                                key={d.label}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{d.label}</TableCell>
                                <TableCell align="left">{d.value + ' [' + d.unit + ']'}</TableCell>
                                <TableCell align="left">
                                    <ChangeValueSlider
                                        value={d.value}
                                        min={d.min}
                                        max={d.max}
                                        step={d.step}
                                        onChange={d.onChange}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {/*</TableContainer>*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={props.onSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditDialog;