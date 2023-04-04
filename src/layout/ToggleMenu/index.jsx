import Link from "next/link";
import styles from "./toggleMenu.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const ToggleMenu = ({ handleCloseNavMenu }) => {
  const menuList = ["Favoritas"];

  return (
    <div className={inter.className}>
      <div className={styles.toggleMenu}>
        {menuList.map((item, i) => {
          return (
            <li className={styles.itemList} key={i}>
              <Link href={"/favoritas"} onClick={handleCloseNavMenu}>
                {item}
              </Link>
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
