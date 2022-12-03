import GoogleMapApi from "../../../../../../components/google-map/GoogleMapApi";
import styles from './AlbumPostMap.module.scss'
import {Grid} from "@mui/material";

export const AlbumPostMap = ()=>{

  return (
    <Grid xs={12} sx={{height:'100%'}}>
      <div> </div>
      <GoogleMapApi
        center={{lat:0,lng:0}} zoom={0.3}
      />
    </Grid>

  )

}
