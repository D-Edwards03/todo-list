import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      try {
        const response = await fetch("/api/tasks?limit=100", {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos.");
        }

        const data = await response.json();
        setTodoList(data.tasks);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsTodoListLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  async function addTodo(todoTitle) {
    setError("");

    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
      isTemp: true,
    };

    setTodoList((prev) => [tempTodo, ...prev]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: todoTitle,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo.");
      }

      const realTodo = await response.json();

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.isTemp && todo.id === tempTodo.id ? realTodo : todo
        )
      );
    } catch (err) {
      setTodoList((prev) =>
        prev.filter((todo) => todo.id !== tempTodo.id)
      );
      setError(err.message || "Something went wrong adding the todo.");
    }
  }

  async function completeTodo(id) {
    setError("");

    const originalTodo = todoList.find((t) => t.id === id);

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo.");
      }
    } catch (err) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? originalTodo : todo
        )
      );
      setError(err.message || "Something went wrong completing the todo.");
    }
  }

  async function updateTodo(editedTodo) {
    setError("");

    const originalTodo = todoList.find((t) => t.id === editedTodo.id);

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          completed: editedTodo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo.");
      }
    } catch (err) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );
      setError(err.message || "Something went wrong updating the todo.");
    }
  }

  return (
    <div>
      <h1>Todo List</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default TodosPage;
