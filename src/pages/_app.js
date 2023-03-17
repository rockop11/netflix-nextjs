import { MoviesContextProvider } from "context/MoviesContext";
import { initFirebase, app } from "../../firebase";

import { Layout } from "../layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  initFirebase(app);

  return (
    <MoviesContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoviesContextProvider>
  );
}
