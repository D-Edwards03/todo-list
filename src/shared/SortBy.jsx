import formStyles from "./Forms.module.css";

function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <div className={formStyles.sortGroup}>
      <label htmlFor="sortBy" className={formStyles.label}>Sort by:</label>

      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className={`${formStyles.select} ${formStyles.sortSelectSpacing}`}
      >
        <option value="createdAt">Created At</option>
        <option value="title">Title</option>
      </select>

      <label htmlFor="sortDirection" className={formStyles.label}>Order:</label>

      <select
        id="sortDirection"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
        className={formStyles.select}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortBy;
