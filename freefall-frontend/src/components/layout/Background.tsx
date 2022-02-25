import background from "../../assets/background.jpg"
import {Box} from "@mui/material";
import React from "react";


const Background: React.FC = (props) => {

    return <Box sx={{
        backgroundImage: `url(${background})`,
        backgroundAttachment: 'sticky',
        bottom: 0, left: 0, right: 0, top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }}>
        {props.children}
    </Box>
}

export default Background;