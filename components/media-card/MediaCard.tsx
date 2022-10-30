import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";

interface MediaCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function MediaCard({
  imageSrc,
  title,
  description,
}: MediaCardProps) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Image height={200} width={300} src={imageSrc} alt="image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
