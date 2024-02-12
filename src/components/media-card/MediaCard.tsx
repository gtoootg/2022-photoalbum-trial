import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { MgLink } from "../link/MgLink";
import Box from "@mui/material/Box";

interface MediaCardProps {
  imageSrc: string;
  title: string;
  description: string;
  index: number;
}

export default function MediaCard({
  imageSrc,
  title,
  description,
  index,
}: MediaCardProps) {
  return (
    <Card>
      <Box
        sx={{
          aspectRatio: "3/2",
          position: "relative",
        }}
      >
        <Image layout="fill" src={imageSrc} alt="image" />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          <span style={{}}>{description}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          sx={{ width: "100%" }}
        >
          <MgLink
            href={`/album-posts/${index}`}
            children={<Typography color={"black"}>See detail</Typography>}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
