import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import Image from "next/image";
import { Box } from "@mui/material";

export interface ImageTransitionProps {
  images: string[];
  className?: string;
}

export const ImageTransition = ({
  images,
  className,
}: ImageTransitionProps) => {
  const [index, set] = useState(0);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
    exitBeforeEnter: true,
  });

  setTimeout(() => {
    if (index === images.length - 1) {
      set(0);
      return;
    }
    set(index + 1);
  }, 10000);

  return (
    <Box>
      {transitions((style, i) => (
        <animated.div style={style} className={className}>
          <Image
            style={{ bottom: "0" }}
            width={3}
            height={2}
            layout="responsive"
            objectFit="contain"
            src={images[i]}
            alt="image"
          />
        </animated.div>
      ))}
    </Box>
  );
};
