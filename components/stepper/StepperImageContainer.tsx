import Image from "next/image";

interface StepperImageContainerProps {
  flickrPhotos: any;
}

export default function StepperImageContainer({
  flickrPhotos,
}: StepperImageContainerProps) {
  return flickrPhotos
    ? flickrPhotos.map((flickrPhoto: any, i: number) => {
        return (
          <Image
            key={i}
            alt="image"
            src={flickrPhoto["url_h"]}
            height={200}
            width={300}
          />
        );
      })
    : null;
}
