import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from './Navigation.module.css';

function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
      color: '#333'
    };
  };

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </li>
        
        {isAuthenticated ? (
          <>
            <li className={styles.navItem}>
              <NavLink to="/todos" style={navLinkStyle}>
                Todos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/profile" style={navLinkStyle}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <NavLink to="/login" style={navLinkStyle}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;