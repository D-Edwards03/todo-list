import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {isAuthenticated && (
        <div>
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;
