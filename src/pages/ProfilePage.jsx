import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  // Pulling email and token from AuthContext
  const { email, token } = useAuth(); 
  
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    let ignore = false;

    async function fetchStats() {
      try {
        // Fetching the user's tasks to calculate their statistics
        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statistics data.');
        }

        const data = await response.json();

        if (!ignore) {
          const totalTasks = data.tasks.length;
          const completedTasks = data.tasks.filter(todo => todo.isCompleted).length;
          const activeTasks = totalTasks - completedTasks;

          setStats({
            total: totalTasks,
            completed: completedTasks,
            active: activeTasks
          });
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <div>
      <h2>User Profile</h2>
      
      <div>
        <p><strong>Account Email:</strong> {email}</p>
      </div>

      <h3>Your Todo Statistics</h3>
      
      {isLoading ? (
        <p>Loading your stats...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          
          <div>
            <h4>Total Tasks</h4>
            <span>{stats.total}</span>
          </div>
          
          <div>
            <h4>Active</h4>
            <span>{stats.active}</span>
          </div>
          
          <div>
            <h4>Completed</h4>
            <span>{stats.completed}</span>
          </div>

        </div>
      )}
    </div>
  );
}

export default ProfilePage;