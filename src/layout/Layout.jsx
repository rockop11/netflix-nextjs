//Components
import { Loader } from "@components/index";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Navbar } from "./Navbar";
//Styles
import styles from "./layout.module.css";
//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={inter.className}>
      {user && (
        <div className={styles.loggedLayout}>
          <Navbar />
          {children}
        </div>
      )}

      {!user && (
        <div className={styles.unloggedLayout}>
          <Navbar />
          {children}
        </div>
      )}
    </div>
  );
};
