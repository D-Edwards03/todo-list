import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>404</h2>
      <h3 className={styles.subHeading}>Page Not Found</h3>

      <p className={styles.description}>
        Oops! It looks like the page you are looking for does not exist or has been moved.
      </p>

      <div className={styles.linkGroup}>
        <Link to="/" className={styles.link}>Return Home</Link>
        <Link to="/todos" className={styles.link}>View Todos</Link>
        <Link to="/about" className={styles.link}>About App</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
