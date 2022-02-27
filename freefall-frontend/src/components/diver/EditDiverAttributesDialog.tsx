import {useAppDispatch, useAppSelector} from "../../store/store";
import {useState} from "react";
import {diverCaseActions} from "../../store/diver-case-slice";
import EditDialog, {EditDialogDisplayData} from "../shared/EditDialog";


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
                return {...prev, volume_compressible: value / 1000}
            }
        )
    }

    function updateVolumeStatic(value: number) {
        setDiverEdited(prev => {
                return {...prev, volume_static: value / 1000}
            }
        )
    }

    function updateDragArea(value: number) {
        setDiverEdited(prev => {
                return {...prev, drag_area: Math.round(value * 100) / 100}
            }
        )
    }

    function updateDragCoefficient(value: number) {
        setDiverEdited(prev => {
                return {...prev, drag_coefficient: Math.round(value * 1000) / 1000}
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
            onChange: updateWeight,
            tooltip: "The weight of the diver without any added weights."
        },
        {
            label: 'Static volume',
            value: diverEdited.volume_static * 1000,
            min: 0,
            max: 150,
            step: 1,
            unit: 'l',
            onChange: updateVolumeStatic,
            tooltip: "The total volume of the diver without air-filled spaces."
        },
        {
            label: 'Compressible volume',
            value: diverEdited.volume_compressible * 1000,
            min: 0,
            max: 10,
            step: 0.5,
            unit: 'm³',
            onChange: updateVolumeCompressible,
            tooltip: "The volume of air-filled spaces at the surface. This is roughly the total lung capacity."
        },
        {
            label: 'Drag Area',
            value: diverEdited.drag_area,
            min: 0.02,
            max: 0.12,
            step: 0.005,
            unit: 'm²',
            onChange: updateDragArea,
            tooltip: "The area the diver presents in falling direction." +
                " Imagine you look from the bottom weight to the diver approaching you in freefall." +
                " The area they cover from that perspective is the drag area."
        },
        {
            label: 'Drag coefficient',
            value: diverEdited.drag_coefficient,
            min: 0.2,
            max: 0.4,
            step: 0.01,
            unit: '',
            onChange: updateDragCoefficient,
            tooltip: "A coefficient that indicates how much resistance the shape and surface of the diver generates."
        }
    ]

    return (
        <EditDialog title="Edit diver attributes"
                    isOpen={props.isOpen}
                    data={displayData}
                    onCancel={handleCancel}
                    onSave={handleSave}
        />
    );
}

export default EditDiverAttributesDialog;
