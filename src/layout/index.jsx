import React from "react";
import { Navbar } from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";

import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
