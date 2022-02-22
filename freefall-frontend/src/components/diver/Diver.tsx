import {useAppSelector} from "../../store/store";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import DiverProperty from "./DiverProperty";


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
                        <DiverProperty label='Weight' value={diver.weight} unit={"[Kg]"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DiverProperty label='Static volume (body without tlc)' value={diver.volumeStatic} unit='[m³]'/>
                    </Grid>
                    <Grid item xs={12}>
                        <DiverProperty label='Compressible Volume (tlc)' value={diver.volumeCompressible} unit='[m³]'/>
                    </Grid>
                    <Grid item xs={12}>
                        <DiverProperty label='Drag area' value={diver.dragArea} unit='[m²]'/>
                    </Grid>
                    <Grid item xs={12}>
                        <DiverProperty label='Drag coefficient' value={diver.dragCoefficient} unit=''/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );


}

export default Diver;