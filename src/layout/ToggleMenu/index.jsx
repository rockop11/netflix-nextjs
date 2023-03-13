import { useContext } from "react";
import MoviesContext from "context/MoviesContext";
import styles from "./toggleMenu.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const ToggleMenu = () => {
  const menuList = ["Peliculas", "Series", "Cuenta"];
  const { logout } = useContext(MoviesContext);

  return (
    <div className={inter.className}>
      <div className={styles.toggleMenu}>
        {menuList.map((item, i) => {
          return (
            <li className={styles.itemList} key={i}>
              {item}
            </li>
          );
        })}
        <hr />

        <li
          style={{ textAlign: "center" }}
          className={styles.itemList}
          onClick={logout}
        >
          Cerrar sesión
        </li>
      </div>
    </div>
  );
};
