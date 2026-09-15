import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import styles from "../Todo.module.css";
import formStyles from "../../../shared/Forms.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;

    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className={styles.editForm}>
          <div className={formStyles.inputGoup}>
            <TextInputWithLabel
              elementId={`todo-${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              onChange={handleEdit}
            />
          </div>

          <button type="button" onClick={handleCancel} className={formStyles.btnSecondary}>
            Cancel
          </button>

          <button type="submit" disabled={!isValidTodoTitle(workingTitle)} className={formStyles.btnPrimary}>
            Update
          </button>
        </form>
      ) : (
        <form className={styles.viewMode}>
          <label htmlFor={`checkbox${todo.id}`}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id={`checkbox${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
          </label>

          <span 
            onClick={() => setIsEditing(true)}
            className={`${styles.todoText} ${todo.isCompleted ? styles.completedText : ""}`}
          >
            {todo.title}
          </span>
        </form>
      )}
    </li>
  );
}

export default TodoListItem;
