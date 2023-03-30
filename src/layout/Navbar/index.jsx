import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import MoviesContext from "context/MoviesContext";
//Components
import Logo from "../../assets/images/netflix-3.svg";
import { Button } from "@layout/Button";
import { ToggleMenu } from "@layout/ToggleMenu";
//Icon
import { BiMenu } from "react-icons/bi";
//Styles
import styles from "./navbar.module.css";

export const Navbar = () => {
  const { searchValueHandler, submitFormHandler, inputSearchRef } =
    useContext(MoviesContext);
  const { user } = useUser();
  const router = useRouter();
  const pathname = router.pathname;

  const [toggleMenu, setToggleMenu] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const handleNavMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    if (pathname !== "/") {
      setHideSearchBar(true);
    } else {
      setHideSearchBar(false);
    }
  }, [hideSearchBar, pathname]);

  const image = { width: "100px", height: "40px", marginLeft: "15px" };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        {user && (
          <BiMenu
            size={"35px"}
            onClick={handleNavMenu}
            className={styles.menu}
          />
        )}
        <Link href={"/"}>
          <Image src={Logo} style={image} alt={"logo-netflix"} priority />
        </Link>
      </ul>

      <ul className={styles.ul}>
        {user ? (
          <div className={styles.rightMenu}>
            {!hideSearchBar && (
              <form onSubmit={submitFormHandler}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Buscar"
                  onChange={searchValueHandler}
                  ref={inputSearchRef}
                />
              </form>
            )}
            <Image
              className={styles.image}
              src={user.picture}
              width={35}
              height={35}
              style={{
                borderRadius: "8px",
                cursor: "pointer",
              }}
              alt={"profile-pic"}
              priority
              onClick={handleNavMenu}
            />
          </div>
        ) : (
          <Link href={"/api/auth/login"}>
            <Button label="Iniciar sesión" />
          </Link>
        )}

        {toggleMenu && <ToggleMenu />}
      </ul>
    </nav>
  );
};
