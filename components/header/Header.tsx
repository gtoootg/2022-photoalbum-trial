import classes from "./Header.module.scss";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { t } = useTranslation();
  const { route, locale } = useRouter();

  function NavigationText() {
    const textItems = [
      {
        text: t("header.navigation.top"),
        href: "/",
      },
    ];

    return (
      <>
        {textItems.map((textItem, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className={classes.header_container_navigation_text}>
              <Link key={index} href={textItem.href}>
                <h3>{textItem.text}</h3>
              </Link>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className={classes.header}>
      <div className={classes.header_container}>
        <div className={classes.header_container_brand}>
          <h1>Michihiro Goto`s Gallery</h1>
        </div>
        <div className={classes.header_container_navigation}>
          <NavigationText />
        </div>
      </div>
    </div>
  );
}
