import {Fragment} from "react";
import {Typography} from "@mui/material";

const KeyValueText = (props: { key: string, value: number }) => {
    return (
        <Fragment>
            <Typography variant="body2" color="text.primary">
                {props.key}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.value}
            </Typography>
        </Fragment>
    );
}

export default KeyValueText