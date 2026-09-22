import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle, getTodoValidationError, MAX_TODO_LENGTH } from "../../utils/todoValidation";
import formStyles from "../../shared/Forms.module.css";
import styles from "./TodoForm.module.css";

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    const errorMessage = getTodoValidationError(workingTodoTitle);

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (isValidTodoTitle(workingTodoTitle)) {
            onAddTodo(workingTodoTitle.trim());
            setWorkingTodoTitle("");
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleAddTodo} className={styles.formWrapper}>
            {errorMessage && (
                <p className={formStyles.formError}>{errorMessage}</p>
            )}

            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
                    <TextInputWithLabel
                        elementId="todoTitle"
                        labelText="Todo"
                        ref={inputRef}
                        value={workingTodoTitle}
                        onChange={(event) => setWorkingTodoTitle(event.target.value)}
                        maxLength={MAX_TODO_LENGTH}
                    />
                </div>

                <button 
                    type="submit" 
                    className={`${formStyles.btnPrimary} ${styles.addButton}`}
                    disabled={!isValidTodoTitle(workingTodoTitle)}
                >
                    Add Todo
                </button>
            </div>
        </form>
    );
}

export default TodoForm;