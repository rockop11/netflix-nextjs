import { useUser } from "@auth0/nextjs-auth0/client";
//Components
import { Navbar } from "./Navbar";
//Styles
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <div className={styles.layoutContainer}>
          <Navbar />
          {children}
        </div>
      )}
      {user && (
        <div className={styles.loggedLayout}>
          <Navbar />
          {children}
        </div>
      )}
    </>
  );
};
