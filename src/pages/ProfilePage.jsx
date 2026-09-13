import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token, isAuthenticated } = useAuth(); 
  
  const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;
      
      try {
        setLoading(true);
        setError('');
        
        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        };
        
        const response = await fetch('/api/tasks', options);
        
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const responseData = await response.json();

        const todos = responseData.tasks || [];
        
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
    <div className="profile-page">
      <h2>User Profile</h2>
      
      <div className="account-info">
        <h3>Account Information</h3>
        <p><strong>Name/Email:</strong> {email|| 'User'}</p>
        <p><strong>Token:</strong> {token || '(none)'}</p>
        <p>
          <strong>Status:</strong> {isAuthenticated ? 'Active / Logged In' : 'Logged Out'}
        </p>
      </div>

      <h3>Your Todo Statistics</h3>
      
      {loading ? (
        <p>Loading your statistics...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="statistics-container">
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Tasks</h4>
              <span>{todoStats.total}</span>
            </div>
            
            <div className="stat-card">
              <h4>Active</h4>
              <span>{todoStats.active}</span>
            </div>
            
            <div className="stat-card">
              <h4>Completed</h4>
              <span>{todoStats.completed}</span>
            </div>
          </div>

          {todoStats.total > 0 && (
            <div className="completion-rate">
              <h3>Completion Rate</h3>
              <p>
                You have completed <strong>{completionPercentage}%</strong> of your tasks!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;