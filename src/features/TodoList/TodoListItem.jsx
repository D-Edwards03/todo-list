import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem ({todo, onCompleteTodo}) {
    const [isEditing, setIsEditng] = useState(false);

    return (
        <li>
            <form>
                {isEditing ? (
                    <TextInputWithLabel value={todo.title}/>
                ) : (
                    <>
                        <label>
                            <input 
                                type="checkbox" 
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditng(true)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    )
}

export default TodoListItem;