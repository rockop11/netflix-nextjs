import React from "react";
import styles from "./button.module.css";

export const Button = ({ label }) => {
  return <button className={styles.button}>{label}</button>;
};
