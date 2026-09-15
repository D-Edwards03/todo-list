import formStyles from "./Forms.module.css";

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className={formStyles.inputGroup} style={{ marginBottom: "1rem" }}>
      <label htmlFor="filterInput" className={formStyles.label}>Search todos: </label>
      <input
        id="filterInput"
        type="text"
        className={formStyles.input}
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
      />
    </div>
  );
}

export default FilterInput;