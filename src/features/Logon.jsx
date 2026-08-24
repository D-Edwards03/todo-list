import { useState } from "react";

function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);

    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) {
        throw new Error("Invalid email or password.");
      }

      const data = await response.json();

      if (!data.name || !data.csrfToken) {
        throw new Error("Unexpected server response.");
      }

      onSetEmail(data.name);
      onSetToken(data.csrfToken);
    } catch (err) {
      setAuthError(err.message || "Logon failed.");
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <div>
      <h2>Log On</h2>

      {authError && <p style={{ color: "red" }}>{authError}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isLoggingOn ? "Logging in..." : "Log On"}
        </button>
      </form>
    </div>
  );
}

export default Logon;
