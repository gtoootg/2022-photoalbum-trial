import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SignUpBody } from "../../feature/auth/sign-up/SignUpBody";

export default function SignUpPage() {
  return <SignUpBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["sign-up", "common"])),
      header: true,
    },
  };
}
