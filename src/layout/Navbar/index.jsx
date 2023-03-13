import { useState, useContext } from "react";
import Image from "next/image";
import MoviesContext from "context/MoviesContext";
//Components
import Logo from "../../assets/images/netflix-3.svg";
import { Button } from "@layout/Button";
import { ToggleMenu } from "@layout/ToggleMenu";
//Styles
import styles from "./navbar.module.css";
//Icon
import { BiMenu } from "react-icons/bi";

export const Navbar = () => {
  const {
    searchValueHandler,
    submitFormHandler,
    inputSearchRef,
    user,
    loginFirebaseHandler,
  } = useContext(MoviesContext);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleNavMenu = () => {
    setToggleMenu(!toggleMenu);
  };

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
        <Image src={Logo} style={image} alt={"logo-netflix"} priority />
      </ul>

      <ul className={styles.ul}>
        {user ? (
          <div className={styles.rightMenu}>
            <form onSubmit={submitFormHandler}>
              <input
                className={styles.input}
                type="text"
                placeholder="Buscar"
                onChange={searchValueHandler}
                ref={inputSearchRef}
              />
            </form>
            <Image
              className={styles.image}
              src={user.photoURL}
              width={35}
              height={35}
              style={{
                borderRadius: "8px",
              }}
              alt={"profile-pic"}
              priority
              onClick={handleNavMenu}
            />
          </div>
        ) : (
          <Button label="Iniciar sesión" event={loginFirebaseHandler} />
        )}

        {toggleMenu && <ToggleMenu />}
      </ul>
    </nav>
  );
};

//IMAGEN DE PERFIL
// <Image
//   src={user.picture}
//   width={35}
//   height={35}
//   style={{
//     borderRadius: "8px",
//   }}
//   alt={"profile-pic"}
//   priority
//   onClick={handleNavMenu}
// />
