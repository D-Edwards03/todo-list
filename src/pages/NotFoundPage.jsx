import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h2>404</h2>
      <h3>Page Not Found</h3>
      <p>
        Oops! It looks like the page you are looking for does not exist or has
        been moved.
      </p>

      <div>
        <Link to="/">Return Home</Link>
        <Link to="/todos">View Todos</Link>
        <Link to="/about">About App</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
