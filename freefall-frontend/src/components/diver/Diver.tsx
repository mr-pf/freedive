import {useAppSelector} from "../../store/store";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import KeyValueText from "./KeyValueText";


const Diver = () => {

    const diver = useAppSelector(state => state.diverCase.diver)

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Diver
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <KeyValueText key='Weight' value={diver.weight}/>
                    </Grid>
                    <Grid item xs={6}>
                        <KeyValueText key={'Static volume (body without tlc)'} value={diver.volumeStatic}/>
                    </Grid>
                    <Grid item xs={6}>
                        <KeyValueText key={'Compressible Volume (tlc)'} value={diver.volumeCompressible}/>
                    </Grid>
                    <Grid item xs={6}>
                        <KeyValueText key={'Drag area'} value={diver.dragArea}/>
                    </Grid>
                    <Grid item xs={6}>
                        <KeyValueText key={'Drag coefficient'} value={diver.dragCoefficient}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )


}

export default Diver;