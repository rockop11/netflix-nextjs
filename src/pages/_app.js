import { MoviesContextProvider } from "context/MoviesContext";
import { initFirebase, app } from "../../firebase";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  initFirebase(app);

  return (
    <UserProvider>
      <MoviesContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </MoviesContextProvider>
    </UserProvider>
  );
}
