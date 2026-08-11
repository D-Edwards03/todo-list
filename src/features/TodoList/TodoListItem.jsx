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
    finishEdit
  } = useEditableTitle(todo.title)

  const handleUpdate = (event) => {
    if (!isEditing) return;

    event.preventDefault();
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel value={workingTitle} onChange={(event) => updateTitle(event.target.value)} />
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
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          />
          <span onClick={startEditing}>{todo.title}</span>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
