import Link from "next/link";
import styles from "./toggleMenu.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const ToggleMenu = () => {
  const menuList = ["Peliculas", "Series", "Cuenta"];

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

        <Link href="/api/auth/logout">
          <li style={{ textAlign: "center" }} className={styles.itemList}>
            Cerrar sesión
          </li>
        </Link>
      </div>
    </div>
  );
};
