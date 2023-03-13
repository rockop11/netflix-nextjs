import React from "react";
import styles from "./button.module.css";

export const Button = ({ label, event }) => {
  return (
    <button className={styles.button} onClick={event}>
      {label}
    </button>
  );
};
