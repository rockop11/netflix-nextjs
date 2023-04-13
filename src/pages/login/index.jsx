import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
//Components
import { Loader, UnloggedContent } from "@components/index";
//Layout
import { Layout } from "@layout/Layout";

const LoginPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <>
        {user && <Loader />}
        {!user && <UnloggedContent />}
      </>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
