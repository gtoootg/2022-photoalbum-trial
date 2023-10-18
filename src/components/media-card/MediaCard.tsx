import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  return (
    <Card>
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          width={3}
          height={2}
          layout="responsive"
          objectFit="contain"
          src={imageSrc}
          alt="image"
        />
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
