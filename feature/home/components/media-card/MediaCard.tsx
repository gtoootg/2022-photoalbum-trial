import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

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
      <div
        style={{
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
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          <span style={{}}>{description}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/album-posts/[index]`} as={`/album-posts/${index}`}>
          See detail
        </Link>
      </CardActions>
    </Card>
  );
}
