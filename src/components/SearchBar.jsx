function SearchBar({ value, onChange, sortOrder, onSortChange }) {
  return (
    <div class="search-bar">
      <div class="search-input-group">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          placeholder="Search products by name..."
          value={value}
          onChange={onChange}
        />
        {value && (
          <button
            type="button"
            class="clear-search-btn"
            onClick={() => onChange({ target: { value: "" } })}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div class="sort-select-group">
        <label htmlFor="sort-order" class="sort-label">
          Sort by:
        </label>
        <select
          id="sort-order"
          class="sort-select"
          value={sortOrder}
          onChange={onSortChange}
        >
          <option value="default">Featured</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
