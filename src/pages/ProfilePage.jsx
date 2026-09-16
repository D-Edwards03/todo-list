import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Profile.module.css";
import formStyles from "../shared/Forms.module.css";

function ProfilePage() {
  const { name, token, isAuthenticated } = useAuth(); 
  
  const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;
      
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }
        
        const todos = data.tasks || [];

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;
        
        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTodoStats();
  }, [token]);

  const completionPercentage = todoStats.total > 0 
    ? Math.round((todoStats.completed / todoStats.total) * 100) 
    : 0;

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.heading}>User Profile</h2>
      
      <div className={styles.card}>
        <h3 className={styles.heading}>Account Information</h3>
        <p><strong>Name:</strong> {name || 'User'}</p>
        <p><strong>Token:</strong> {token || '(none)'}</p>
        <p><strong>Status:</strong> {isAuthenticated ? 'Active / Logged In' : 'Logged Out'}</p>
      </div>

      <h3 className={styles.heading}>Your Todo Statistics</h3>

      {error && <div className={formStyles.errorAlert}>{error}</div>}

      {loading ? (
        <p>Loading your statistics...</p>
      ) : (
        <div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h4>Total Tasks</h4>
              <span>{todoStats.total}</span>
            </div>
            
            <div className={styles.statCard}>
              <h4>Active</h4>
              <span>{todoStats.active}</span>
            </div>
            
            <div className={styles.statCard}>
              <h4>Completed</h4>
              <span>{todoStats.completed}</span>
            </div>
          </div>

          {todoStats.total > 0 && (
            <div className={styles.completionCard}>
              <h3>Completion Rate</h3>
              <p className={styles.completionText}>
                You have completed{" "}
                <strong className={styles.completionPercent}>
                  {completionPercentage}%
                </strong>{" "}
                of your tasks!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;