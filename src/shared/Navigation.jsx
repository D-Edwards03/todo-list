import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navigation.module.css";

function Navigation() {
  const { isAuthenticated } = useAuth();

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li className={styles.navItem}>
              <NavLink to="/todos" className={getNavLinkClass}>
                Todos
              </NavLink>
            </li>

            <li className={styles.navItem}>
              <NavLink to="/profile" className={getNavLinkClass}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <NavLink to="/login" className={getNavLinkClass}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;