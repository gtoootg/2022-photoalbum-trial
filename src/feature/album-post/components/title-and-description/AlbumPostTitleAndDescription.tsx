import styles from "./AlbumPostTitleAndDescription.module.scss";
import { MgText } from "../../../../components/text/MgText";
import { Box, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
interface AlbumPostTitleAndDescriptionProps {
  title: string;
  description: string;
}

const AlbumPostTitleAndDescription = ({
  title,
  description,
}: AlbumPostTitleAndDescriptionProps) => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Box mr={1}>
          <AccountCircleIcon sx={{ height: "60px", width: "60px" }} />
        </Box>
        <MgText variant={"h5"} content={"Michihiro Goto"} />
      </Box>
      <Typography variant={"h5"}>{title}</Typography>
      <Typography variant={"h5"}>{description}</Typography>
    </>
    // <Grid className={styles.titleAndDescription} container item xs={12}>
    //   <div className={styles.titleAndDescription_title}>
    //     <MgText variant={"h5"} content={title} />
    //   </div>
    //   <div>
    //     <MgText
    //       variant={"body2"}
    //       content={description}
    //       className={styles.titleAndDescription_description}
    //     />
    //   </div>
    // </Grid>
  );
};

export default AlbumPostTitleAndDescription;
