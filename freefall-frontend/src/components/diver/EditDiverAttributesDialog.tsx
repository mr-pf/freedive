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
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useState} from "react";
import {diverCaseActions} from "../../store/diver-case";
import ChangeValueSlider from "../../shared/ChangeValueSlider";
import EditDialog, {EditDialogDisplayData} from "../../shared/EditDialog";


const EditDiverAttributesDialog = (props: { isOpen: boolean, onClose: () => void }) => {

    const diver = useAppSelector(state => state.diverCase.diver);
    const dispatch = useAppDispatch();

    const [diverEdited, setDiverEdited] = useState(diver)

    function updateWeight(value: number) {
        setDiverEdited(prev => {
                return {...prev, weight: value}
            }
        )
    }

    function updateVolumeCompressible(value: number) {
        setDiverEdited(prev => {
                return {...prev, volumeCompressible: value / 1000}
            }
        )
    }

    function updateVolumeStatic(value: number) {
        setDiverEdited(prev => {
                return {...prev, volumeStatic: value / 1000}
            }
        )
    }

    function updateDragArea(value: number) {
        setDiverEdited(prev => {
                return {...prev, dragArea: Math.round(value * 100) / 100}
            }
        )
    }

    function updateDragCoefficient(value: number) {
        setDiverEdited(prev => {
                return {...prev, dragCoefficient: Math.round(value * 1000) / 1000}
            }
        )
    }

    function handleCancel() {
        props.onClose();
    }

    function handleSave() {
        dispatch(diverCaseActions.setDiver(diverEdited));
        props.onClose();
    }

    const displayData: EditDialogDisplayData[] = [
        {
            label: 'Weight',
            value: diverEdited.weight,
            min: 0,
            max: 150,
            step: 1,
            unit: 'Kg',
            onChange: updateWeight
        },
        {
            label: 'Volume static',
            value: diverEdited.volumeStatic * 1000,
            min: 0,
            max: 150,
            step: 1,
            unit: 'l',
            onChange: updateVolumeStatic
        },
        {
            label: 'Volume compressible',
            value: diverEdited.volumeCompressible * 1000,
            min: 0,
            max: 10,
            step: 0.5,
            unit: 'm³',
            onChange: updateVolumeCompressible
        },
        {
            label: 'Drag Area',
            value: diverEdited.dragArea,
            min: 0.02,
            max: 0.12,
            step: 0.005,
            unit: 'm²',
            onChange: updateDragArea
        },
        {
            label: 'Drag coefficient',
            value: diverEdited.dragCoefficient,
            min: 0.2,
            max: 0.4,
            step: 0.01,
            unit: '',
            onChange: updateDragCoefficient
        }
    ]

    return (
        <EditDialog title="Edit diver attributes"
                    isOpen={props.isOpen}
                    data={displayData}
                    onCancel={handleCancel}
                    onSave={handleSave}/>
    );
}

export default EditDiverAttributesDialog;
