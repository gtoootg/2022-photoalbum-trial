import styles from "./TitleAndMetaData.module.scss";
import { Text } from "../../../../components/text/Text";

interface TitleAndMetadataProps {
  title: string;
  description: string;
}

const TitleAndMetaData = ({ title, description }: TitleAndMetadataProps) => {
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

export default TitleAndMetaData;
