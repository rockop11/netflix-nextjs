import { MoviesContextProvider } from "context/MoviesContext";
import { initFirebase } from "../../firebase/client";
import { Layout } from "../layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  //chequear el init firebase
  const app = initFirebase();

  return (
    <MoviesContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoviesContextProvider>
  );
}
