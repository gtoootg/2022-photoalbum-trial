import styles from "./AlbumPostTitleAndDescription.module.scss";
import { Text } from "../../../../components/text/Text";

interface AlbumPostTitleAndDescriptionProps {
  title: string;
  description: string;
}

const AlbumPostTitleAndDescription = ({
  title,
  description,
}: AlbumPostTitleAndDescriptionProps) => {
  return (
    <div className={styles.titleAndMetaData}>
      <Text
        variant={"h4"}
        content={title}
        className={styles.titleAndMetaData_title}
      />
      <Text
        variant={"body1"}
        content={description}
        className={styles.titleAndMetaData_description}
      />
    </div>
  );
};

export default AlbumPostTitleAndDescription;
