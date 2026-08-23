import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    event?.preventDefault();

    if (!isEditing) return;

    onUpdateTodo({ ...todo, title: workingTitle });
    setWorkingTitle(workingTitle);
    setIsEditing(false);
  };

  const onToggle = (id) => {
    onCompleteTodo(id);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            label="Edit todo"
            value={workingTitle}
            onChange={(event) => setWorkingTitle(event.target.value)}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </>
      )}

      {!isEditing && (
        <button type="button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      )}
    </li>
  );
}

export default TodoListItem;
