import { useState, useEffect, useCallback } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";
import SortBy from "../../shared/SortBy.jsx";
import FilterInput from "../../shared/FilterInput.jsx";
import useDebounce from "../../utils/useDebounce.js";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const [dataVersion, setDataVersion] = useState(0);

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };

  const invalidateCache = useCallback(() => {
    console.log("Invalidating memo cache after todo mutation");
    setDataVersion((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized. Please log on again.");
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
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    setError("");

    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
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
          isCompleted: false,
        }),
      });

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log on again.");
      }

      if (!response.ok) {
        throw new Error("Failed to add todo.");
      }

      const realTodo = await response.json();

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.isTemp && todo.id === tempTodo.id ? realTodo : todo
        )
      );

      invalidateCache();

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
        todo.id === id ? { ...todo, isCompleted: true } : todo
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
        body: JSON.stringify({ isCompleted: true }),
      });

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log on again.");
      }

      if (!response.ok) {
        throw new Error("Failed to complete todo.");
      }

      invalidateCache();

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
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log on again.");
      }

      if (!response.ok) {
        throw new Error("Failed to update todo.");
      }

      invalidateCache();

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
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy 
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}

export default TodosPage;
