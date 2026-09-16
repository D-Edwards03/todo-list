import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import formStyles from "../shared/Forms.module.css";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/todos';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || 'Failed to log on');
      }
    } catch {
      setError('Failed to log on');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={formStyles.formContainer}>
      <h2>Log On</h2>

      {error && <p className={formStyles.formError}>{error}</p>}

      <form onSubmit={handleSubmit} className={formStyles.form}>
        <div className={formStyles.inputGroup}>
          <label htmlFor="email" className={formStyles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={formStyles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={255}
          />
        </div>

        <div className={formStyles.inputGroup}>
          <label htmlFor="password" className={formStyles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={formStyles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={255}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={formStyles.btnPrimary}
        >
          {isLoading ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;