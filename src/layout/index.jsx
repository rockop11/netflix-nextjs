import { useContext } from "react";
import MoviesContext from "context/MoviesContext";

//Components
import { Navbar } from "./Navbar";
//Styles
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  const { user } = useContext(MoviesContext);
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

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
