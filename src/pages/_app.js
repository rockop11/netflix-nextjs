import { MoviesContextProvider } from "context/MoviesContext";
import { initFirebase, app } from "../../firebase";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { Layout } from "../layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  initFirebase(app);

  return (
    <UserProvider>
      <MoviesContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoviesContextProvider>
    </UserProvider>
  );
}
