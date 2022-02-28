import {useAppDispatch, useAppSelector} from "../../store/store";
import {useEffect, useState} from "react";
import {diverCaseActions} from "../../store/diver-case-slice";
import EditDialog, {EditDialogDisplayData} from "../layout/EditDialog";
import {Scenario} from "../../models/diver-case";


const EditScenarioDialog = (props: { isOpen: boolean, scenario: Scenario, onClose: () => void }) => {

    const dispatch = useAppDispatch();

    const [scenarioEdited, setScenarioEdited] = useState(props.scenario)

    useEffect(() => {
        setScenarioEdited(props.scenario)
    }, [props.scenario])

    function updateStartDepth(value: number) {
        setScenarioEdited(prev => {
                return {...prev, start_depth: value}
            }
        )
    }

    function updateStartVelocity(value: number) {
        setScenarioEdited(prev => {
                return {...prev, start_velocity: value}
            }
        )
    }

    function updateExtraWeight(value: number) {
        setScenarioEdited(prev => {
                return {...prev, extra_weight: value}
            }
        )
    }

    function handleCancel() {
        props.onClose();
    }

    function handleSave() {
        dispatch(diverCaseActions.putScenario(scenarioEdited));
        props.onClose();
    }

    const displayData: EditDialogDisplayData[] = [
        {
            label: 'Start depth',
            value: scenarioEdited.start_depth,
            min: 0,
            max: 120,
            step: 1,
            unit: 'm',
            onChange: updateStartDepth,
            tooltip: "Depth at which the diver starts the freefall"
        },
        {
            label: 'start velocity',
            value: scenarioEdited.start_velocity,
            min: 0,
            max: 3,
            step: 0.1,
            unit: 'm/s',
            onChange: updateStartVelocity,
            tooltip: "Velocity when the diver starts freefalling"
        },
        {
            label: 'Extra weight',
            value: scenarioEdited.extra_weight,
            min: 0,
            max: 10,
            step: 0.5,
            unit: 'Kg',
            onChange: updateExtraWeight,
            tooltip: "Any weight that the diver adds on the weight belt or with a neck weight"
        }
    ]

    return (
        <EditDialog title="Edit scenario"
                    isOpen={props.isOpen}
                    data={displayData}
                    onCancel={handleCancel}
                    onSave={handleSave}/>
    );
}

export default EditScenarioDialog;