import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, statusFilter = 'active' }) {

  const safeList = Array.isArray(todoList) ? todoList : [];
   
  const filteredTodos = useMemo(() => {
    switch (statusFilter) {
      case 'completed':
        return safeList.filter((todo) => todo.isCompleted);
      case 'active':
        return safeList.filter((todo) => !todo.isCompleted);
      case 'all':
      default:
        return todoList;
    }
  }, [safeList, statusFilter]);

  const getEmptyMessage = () => {
    if (safeList.length === 0) {
      return 'No todos yet. Add a todo above to get started.';
    }

    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet. Complete some tasks to see them here.';
      case 'active':
        return 'No active todos. Add a todo above to get started.';
      case 'all':
      default:
        return 'Add todo above to get started.';
    }
  };

  if (filteredTodos.length === 0) {
    return <p>{getEmptyMessage()}</p>;
  }

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
