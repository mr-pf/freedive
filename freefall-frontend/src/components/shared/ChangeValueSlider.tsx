import {IconButton, Slider, Stack} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useEffect, useState} from "react";

const ChangeValueSlider = (
    props: { value: number, min: number, max: number, step: number, onChange: (value: number) => void }) => {

    const [value, setValue] = useState(props.value);

    useEffect(() => {
         props.onChange(value)
    }, [value])

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const decrementValue = () => {
        setValue(value => Math.max(value - props.step, props.min))
    }

    const incrementValue = () => {
        setValue(value => Math.min(value + props.step, props.max))
    }

    return (
        <Stack direction="row">
            <IconButton onClick={decrementValue}>
                <RemoveCircleOutlineOutlinedIcon/>
            </IconButton>
            <Slider sx={{minWidth: 100}}
                    value={value}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    onChange={handleSliderChange}
                    disabled={false}
            />
            <IconButton onClick={incrementValue}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>

        </Stack>
    );
}

export default ChangeValueSlider;