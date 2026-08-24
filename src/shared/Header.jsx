function Header({ token, onSetToken, onSetEmail }) {
  return (
    <header>
      <h1>Todo App</h1>

      {token && (
        <button
          onClick={() => {
            onSetToken("");
            onSetEmail("");
          }}
        >
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;
