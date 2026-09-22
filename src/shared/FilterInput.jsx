import formStyles from "./Forms.module.css";
import { MAX_TODO_LENGTH } from "../utils/todoValidation";

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className={`${formStyles.inputGroup} ${formStyles.inputGroupSpacing}`}>
      <label htmlFor="filterInput" className={formStyles.label}>
        Search todos:
      </label>

      <input
        id="filterInput"
        type="text"
        className={formStyles.input}
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        maxLength={MAX_TODO_LENGTH}
      />
    </div>
  );
}

export default FilterInput;
