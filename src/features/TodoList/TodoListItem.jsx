import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import { useEditableTitle } from "../../hooks/useEditableTitle";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  const handleUpdate = (event) => {
    if (!isEditing) return;

    event.preventDefault();

    if (!isValidTodoTitle(workingTitle)) {
      cancelEdit();
      return;
    }

    onUpdateTodo({ ...todo, title: workingTitle });

    finishEdit();
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            elementId={`edit-todo-${todo.id}`}
            labelText="Edit Todo"
            value={workingTitle}
            onChange={(event) => updateTitle(event.target.value)}
          />
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={!isValidTodoTitle(workingTitle)}
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <form>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
            <span onClick={startEditing}>{todo.title}</span>
          </form>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
