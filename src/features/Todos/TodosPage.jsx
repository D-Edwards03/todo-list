import { useEffect, useReducer } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";
import SortBy from "../../shared/SortBy.jsx";
import FilterInput from "../../shared/FilterInput.jsx";
import useDebounce from "../../utils/useDebounce.js";
import {todoReducer, initialTodoState, TODO_ACTIONS} from "../../reducers/todoReducer.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

function TodosPage() {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: newTerm });
  };

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
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
        
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: data.tasks, 
        });

      } catch (error) {
        const isFilterError = Boolean(debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc');
        
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError 
                ? `Error filtering/sorting todos: ${error.message}` 
                : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
      isTemp: true,
    };

    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: tempTodo });

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

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: { tempId: tempTodo.id, realTodo },
      });

    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: tempTodo.id,
          error: err.message || "Something went wrong adding the todo.",
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((t) => t.id === id);

    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: id });

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

      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS });

    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo,
          error: err.message || "Something went wrong completing the todo.",
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((t) => t.id === editedTodo.id);

    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: editedTodo });

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

      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS });

    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          error: err.message || "Something went wrong updating the todo.",
        },
      });
    }
  }

  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          <p>{error}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR, payload: 'error' })}>
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div style={{ color: "orange", marginBottom: "1rem" }}>
          <p>{filterError}</p>
          <button 
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR, payload: 'filterError' })} 
            style={{ marginRight: "0.5rem" }}
          >
            Clear Filter Error
          </button>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}>
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy 
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) => 
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: newSortBy, sortDirection }
          })
        }
        onSortDirectionChange={(newDirection) => 
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy, sortDirection: newDirection }
          })
        }
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