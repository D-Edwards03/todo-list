import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./HomePage.module.css";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(isAuthenticated ? "/todos" : "/login", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.redirectContainer}>
      <p className={styles.redirectText}>Redirecting...</p>
    </div>
  );
}

export default HomePage;