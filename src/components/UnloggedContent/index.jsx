import styles from "./unloggedContent.module.css";

export const UnloggedContent = () => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Películas y series ilimitadas y mucho más
        </h2>
        <h4 className={styles.subtitle}>
          Disfruta donde quieras. Cancela cuando quieras.
        </h4>

        <p className={styles.text}>
          ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o
          reiniciar tu membresía de Netflix.
        </p>
      </div>
    </>
  );
};
