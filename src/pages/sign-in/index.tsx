import { SignInBody } from "../../feature/auth/sign-in/SignInBody";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SignInPage() {
  return <SignInBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      header: false,
    },
  };
}
