import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import formStyles from "../../shared/Forms.module.css";

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (workingTodoTitle.trim() !== "") {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("");
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleAddTodo} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                <div style={{ flexGrow: 1 }}>
                    <TextInputWithLabel
                        elementId="todoTitle"
                        labelText="Todo"
                        ref={inputRef}
                        value={workingTodoTitle}
                        onChange={(event) => setWorkingTodoTitle(event.target.value)}
                    />
                </div>
            
            
                <button 
                type="submit" 
                className={formStyles.btnPrimary}
                disabled={!isValidTodoTitle(workingTodoTitle)}
                style={{ marginBottom: "1rem" }}
                >
                    Add Todo
                </button>
            </div>
        </form>
    );
}

export default TodoForm;