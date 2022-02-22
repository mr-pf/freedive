import {Fragment} from "react";
import {Typography} from "@mui/material";

const DiverProperty = (props: { label: string, value: number, unit:string }) => {
    return (
        <Fragment>
            <Typography variant="body2" color="text.secondary" display="inline">
                {props.label}:
            </Typography>
            <Typography variant="body2" color="text.primary" display="inline">
                {props.value}
            </Typography>
            <Typography variant="body2" color="text.primary" display="inline">
                {props.unit}
            </Typography>
        </Fragment>
    );
}

export default DiverProperty